import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { Authentication } from './entities/authentication.entity';
import { AuthenticationRepository } from './authentication.repository';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { ExceptionService } from 'src/common/services/exception.service';
import { LoginDto } from './dto/login.dto';
import { UserState } from './enums/user-state.enum';
import { PaginationSearchDto } from 'src/common/dtos/pagination-search.dto';
import { GenericServiceInterface } from 'src/common/interfaces/generic-service.interface';
import { ResponseService } from 'src/common/services/response.service';

@Injectable()
export class AuthenticationService
  implements GenericServiceInterface<Authentication>
{
  private columnsToFind: (keyof Authentication)[] = [
    'firstName',
    'lastName',
    'email',
    'userName',
    'phoneNumber',
  ];

  constructor(
    private readonly authRepo: AuthenticationRepository,
    private readonly jwtSvc: JwtService,
    private readonly exceptionSvc: ExceptionService,
    private readonly responseSvc: ResponseService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = this.authRepo.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await this.authRepo.save(user);

      delete user.password;

      const data = {
        ...user,
        token: this.getJwtToken({ id: user.id }),
      };

      return this.responseSvc.created(data);
    } catch (error) {
      this.exceptionSvc.handle(error);
    }
  }

  async login(loginDto: LoginDto) {
    const { password, userName } = loginDto;

    const user = await this.authRepo.findOne({
      where: { userName },
      select: { userName: true, password: true, id: true, state: true },
    });

    if (!user) {
      throw new UnauthorizedException('Credentials are not valid');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Credentials are not valid');
    }

    if (user.state !== UserState.ACTIVE) {
      throw new UnauthorizedException('This user is not allowed');
    }

    delete user.password;
    delete user.state;

    const data = {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };

    return this.responseSvc.success('User authenticated', data);
  }

  async findAll(paginationSearchDto: PaginationSearchDto) {
    const { page = 1, currentElements = 10, query = '' } = paginationSearchDto;

    const queryBuilder = this.authRepo.createQueryBuilder('user');

    this.columnsToFind.forEach((field, index) => {
      const condition = `LOWER(user.${field}) LIKE :value`;
      if (index === 0) {
        queryBuilder.where(condition, { value: `%${query.toLowerCase()}%` });
      } else {
        queryBuilder.orWhere(condition, { value: `%${query.toLowerCase()}%` });
      }
    });

    queryBuilder.skip((page - 1) * currentElements).take(currentElements);

    const [results, total] = await queryBuilder
      .orderBy('user.createdAt', 'DESC')
      .getManyAndCount();

    const data = {
      total,
      page,
      currentElements,
      results,
    };

    return this.responseSvc.success('Data found', data);
  }

  async findOne(id: string) {
    const user = await this.authRepo.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.responseSvc.success('User found', user);
  }

  async update(id: string, updateUserDto: UpdateAuthenticationDto) {
    const exists = await this.authRepo.dataExistsByProperty('id', id);

    if (!exists) {
      throw new NotFoundException('User not exists');
    }

    try {
      const user = await this.authRepo.preload({
        id,
        ...updateUserDto,
      });

      const userUpdated = await this.authRepo.save(user);

      return this.responseSvc.updated(userUpdated);
    } catch (error) {
      this.exceptionSvc.handle(error);
    }
  }

  async remove(id: string) {
    const exists = await this.authRepo.dataExistsByProperty('id', id);

    if (!exists) {
      throw new NotFoundException('User not exists');
    }

    await this.authRepo.delete({ id });

    return this.responseSvc.deleted();
  }

  private getJwtToken(payload: JwtPayload): string {
    const token = this.jwtSvc.sign(payload);
    return token;
  }
}
