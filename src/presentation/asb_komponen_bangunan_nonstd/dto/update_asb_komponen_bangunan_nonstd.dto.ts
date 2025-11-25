import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateAsbKomponenBangunanNonstdDto {
    @IsNumber()
    id!: number;

    @IsString()
    @IsOptional()
    komponen?: string;

    @IsNumber()
    @IsOptional()
    bobotMin?: number;

    @IsNumber()
    @IsOptional()
    bobot?: number;

    @IsNumber()
    @IsOptional()
    bobotMax?: number;
}
