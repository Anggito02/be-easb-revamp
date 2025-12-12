import { IsInt, IsOptional, Min, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetKecamatansDto {

    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    page?: number;


    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    amount?: number;


    @IsInt()
    @Type(() => Number)
    @IsOptional()
    idKabkota?: number;


    @IsString()
    @IsOptional()
    search?: string;
}
