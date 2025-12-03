import { IsNumber, IsNotEmpty, IsArray } from 'class-validator';

export class VerifyBpsDto {
    @IsNumber()
    @IsNotEmpty()
    id_asb: number;

    @IsArray()
    @IsNumber({}, { each: true })
    verif_komponen_std: number[];

    @IsArray()
    @IsNumber({}, { each: true })
    verif_bobot_acuan_std: number[];

    // internal use
    id_asb_bipek_std?: number[];
}
