import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  email: string;

  @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], {
    message: 'Valid role required',
  })
  role: 'INTERN' | 'ENGINEER' | 'ADMIN';
}
