import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator';

export class CreateAdminAccountDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    username!: string;

    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(6)
    @MaxLength(100)
    password!: string;
}
