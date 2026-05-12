import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetAsbAnalyticDto {
    @Type(() => Number)
    @IsInt()
    @Min(2000)
    @Max(2100)
    tahun!: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(12)
    bulan?: number;
}
