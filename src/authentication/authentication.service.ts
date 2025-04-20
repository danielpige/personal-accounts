import { Injectable } from '@nestjs/common';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { Authentication } from './entities/authentication.entity';
import { AuthenticationRepository } from './authentication.repository';

@Injectable()
export class AuthenticationService {
  constructor(private readonly authRepo: AuthenticationRepository) {}

  create(createAuthenticationDto: CreateAuthenticationDto) {
    return 'This action adds a new authentication';
  }

  async findAll(): Promise<Authentication[]> {
    return this.authRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} authentication`;
  }

  update(id: number, updateAuthenticationDto: UpdateAuthenticationDto) {
    return `This action updates a #${id} authentication`;
  }

  remove(id: number) {
    return `This action removes a #${id} authentication`;
  }
}
