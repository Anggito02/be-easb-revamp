import { IsInt, IsNotEmpty, IsNumber, IsArray, ArrayMinSize, IsOptional } from 'class-validator';

export class UpdateAsbStoreLantaiDto {
    @IsInt()
    @IsNotEmpty()
    id_asb: number;

    @IsArray()
    @ArrayMinSize(1)
    @IsNumber({}, { each: true })
    luas_lantai: number[];

    @IsArray()
    @ArrayMinSize(1)
    @IsInt({ each: true })
    id_asb_lantai: number[];

    @IsArray()
    @ArrayMinSize(1)
    @IsInt({ each: true })
    id_asb_fungsi_ruang: number[];

    @IsOptional()
    id_asb_bipek_standard?: number[];

    @IsOptional()
    id_asb_bipek_nonstd?: number[];

    @IsOptional()
    id_asb_klasifikasi?: number;
}
