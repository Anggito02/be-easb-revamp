import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateAsbTipeBangunanDto {
    @IsString()
    @IsNotEmpty()
    tipe_bangunan!: string;

    @IsOptional()
    @IsNumber()
    room_id?: number;
}
