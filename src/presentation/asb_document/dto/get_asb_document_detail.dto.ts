import { IsNumber } from 'class-validator';

export class GetAsbDocumentDetailDto {
    @IsNumber()
    id: number;
}
