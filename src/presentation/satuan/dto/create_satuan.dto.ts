import { IsString, IsNotEmpty, Length, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateSatuanDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 255)
    satuan: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @IsOptional()
    @IsNumber()
    room_id?: number;
}
