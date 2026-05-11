import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateAdminAccountDto {
    @IsString()
    @IsNotEmpty()
    username!: string;

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;
}
