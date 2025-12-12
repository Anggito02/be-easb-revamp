import { IsInt, IsOptional, Min, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetKelurahansDto {
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
    idKecamatan?: number;

    @IsString()
    @IsOptional()
    search?: string;
}
