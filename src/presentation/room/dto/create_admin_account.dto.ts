import { Type } from 'class-transformer';
import {
    IsString,
    IsNotEmpty,
    IsEmail,
    MinLength,
    MaxLength,
    IsOptional,
    IsInt,
    ValidateIf,
} from 'class-validator';

export class CreateAdminAccountDto {
    /** When set, links an existing Manajemen Akun user (must have Admin role) to this room. */
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    userId?: number;

    @ValidateIf((o: CreateAdminAccountDto) => o.userId == null)
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    username?: string;

    @ValidateIf((o: CreateAdminAccountDto) => o.userId == null)
    @IsEmail()
    email?: string;

    @ValidateIf((o: CreateAdminAccountDto) => o.userId == null)
    @IsString()
    @MinLength(6)
    @MaxLength(100)
    password?: string;
}
