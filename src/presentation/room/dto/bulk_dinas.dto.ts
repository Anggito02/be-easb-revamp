import { IsString, IsNotEmpty } from 'class-validator';

export class BulkDinasDto {
    @IsString()
    @IsNotEmpty()
    raw_text!: string;
}
