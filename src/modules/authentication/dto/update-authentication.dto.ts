import { IsString, MinLength } from 'class-validator';

export class UpdateAuthenticationDto {
  @IsString()
  phoneNumber: string;

  @IsString()
  @MinLength(3)
  firstName: string;

  @IsString()
  @MinLength(3)
  lastName: string;
}
