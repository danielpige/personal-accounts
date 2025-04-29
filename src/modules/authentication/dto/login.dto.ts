import { IsString, MaxLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MaxLength(100)
  userName: string;

  @IsString()
  @MaxLength(150)
  password: string;
}
