import { IsString, IsOptional, IsDateString } from 'class-validator';

export class UpdateRoomDto {
    @IsString()
    @IsOptional()
    kode_room?: string;

    @IsString()
    @IsOptional()
    nama?: string;

    @IsOptional()
    @IsDateString()
    contract_start?: string;

    @IsOptional()
    @IsDateString()
    contract_end?: string;
}
