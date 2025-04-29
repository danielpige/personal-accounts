import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  userName: string;

  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  @MinLength(3)
  firstName: string;

  @IsString()
  @MinLength(3)
  lastName: string;

  //   @IsEnum(UserRole, { message: 'The role is wrong' })
  //   role: UserRole;

  //   @IsEnum(UserState, { message: 'The state is wrong' })
  //   state: UserState;
}
