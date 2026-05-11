import { IsNumber, IsNotEmpty, Min } from 'class-validator';

export class AddTahunAnggaranDto {
    @IsNumber()
    @IsNotEmpty()
    @Min(2000)
    tahun!: number;
}
