import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateDinasDto {
    @IsString()
    @IsNotEmpty()
    nama!: string;

    @IsString()
    @IsNotEmpty()
    alias!: string;

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;
}
