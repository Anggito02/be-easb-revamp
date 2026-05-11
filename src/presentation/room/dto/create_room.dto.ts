import { IsString, IsNotEmpty, IsOptional, IsNumber, IsDateString } from 'class-validator';

export class CreateRoomDto {
    @IsString()
    @IsNotEmpty()
    kode_room!: string;

    @IsString()
    @IsNotEmpty()
    nama!: string;

    @IsOptional()
    @IsNumber()
    kabkota_id?: number;

    @IsOptional()
    @IsDateString()
    contract_start?: string;

    @IsOptional()
    @IsDateString()
    contract_end?: string;
}
