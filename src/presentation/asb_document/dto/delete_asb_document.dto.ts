import { IsNumber } from 'class-validator';

export class DeleteAsbDocumentDto {
    @IsNumber()
    id: number;
}
