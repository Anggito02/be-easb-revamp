import { IsString, IsNotEmpty, MinLength, IsArray } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsArray()
  roles: string[];
}
