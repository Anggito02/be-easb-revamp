import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CreateDinasDto {
    @IsString()
    @IsNotEmpty()
    nama!: string;

    @IsString()
    @IsNotEmpty()
    alias!: string;

    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(6)
    password!: string;
}
