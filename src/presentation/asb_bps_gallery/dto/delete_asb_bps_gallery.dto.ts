import { IsNumber } from 'class-validator';

export class DeleteAsbBpsGalleryDto {
    @IsNumber()
    id: number;
}
