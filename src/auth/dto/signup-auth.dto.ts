import { CreateUserDto } from '../../user/dto/create-user.dto';
import { IsEmail, IsEnum, IsOptional, IsStrongPassword } from 'class-validator';
import { Role } from '../../user/enums/role.enum';
import { Transform } from 'class-transformer';

export class SignUpDto extends CreateUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsOptional()
  @Transform(({ value }) => ('' + value).toLowerCase())
  @IsEnum(Role)
  role: Role;
}
