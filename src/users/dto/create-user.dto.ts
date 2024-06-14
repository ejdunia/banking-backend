import { IsEmail, IsString } from 'class-validator';
import { IuserDto, Sex, UserRole } from '../interfaces/user.interface';

export class CreateUserDto implements IuserDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  date_of_birth: string;

  @IsString()
  sex: Sex;

  @IsString()
  role: UserRole;
}
