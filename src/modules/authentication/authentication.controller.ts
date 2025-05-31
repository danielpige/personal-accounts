import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { PaginationSearchDto } from 'src/common/dtos/pagination-search.dto';
import { Auth } from './decorators/auth.decorators';
import { UserRole } from './enums/user-role.enum';
import { GetUser } from './decorators/get-user.decorators';
import { Authentication } from './entities/authentication.entity';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authenticationService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authenticationService.login(loginDto);
  }

  @Post()
  @Auth(...[UserRole.ADMIN, UserRole.USER])
  findAll(
    @Body() paginationSearchDto: PaginationSearchDto,
    @GetUser() user: Authentication,
  ) {
    console.log(user);

    return this.authenticationService.findAll(paginationSearchDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.authenticationService.findOne(id);
  }

  @Patch(':id')
  @Auth(...[UserRole.ADMIN, UserRole.USER])
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAuthenticationDto: UpdateAuthenticationDto,
  ) {
    return this.authenticationService.update(id, updateAuthenticationDto);
  }

  @Delete(':id')
  @Auth(...[UserRole.ADMIN, UserRole.USER])
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.authenticationService.remove(id);
  }
}
