import { IsNumber, IsNotEmpty, IsArray } from 'class-validator';

export class VerifyBpnsDto {
    @IsNumber()
    @IsNotEmpty()
    id_asb: number;

    @IsArray()
    @IsNumber({}, { each: true })
    verif_komponen_nonstd: number[];

    @IsArray()
    @IsNumber({}, { each: true })
    verif_bobot_acuan_nonstd: number[];

    // internal use
    id_asb_bipek_nonstd?: number[];
}
