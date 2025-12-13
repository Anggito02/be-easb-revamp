import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class StoreBpsDto {
    @IsNumber()
    id_asb: number;

    @IsArray()
    @IsNumber({}, { each: true })
    komponen_std: number[];

    @IsArray()
    @IsNumber({}, { each: true })
    bobot_std: number[];
}
