import { IsArray, ArrayNotEmpty, ValidateNested, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class LantaiDetailDto {
    @IsNumber()
    luas: number;

    @IsString()
    jenis: string;

    @IsString()
    fungsi: string;
}

export class LantaiDto {
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => LantaiDetailDto)
    details: LantaiDetailDto[];
}
