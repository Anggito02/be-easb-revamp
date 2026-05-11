import { IsString, IsOptional, IsNumber, IsDateString, IsNotEmpty } from 'class-validator';

export class UpdateRoomDto {
    @IsString()
    @IsOptional()
    kode_room?: string;

    @IsString()
    @IsOptional()
    nama?: string;

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
