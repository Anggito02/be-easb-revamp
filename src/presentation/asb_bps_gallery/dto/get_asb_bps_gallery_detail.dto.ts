import { IsNumber } from 'class-validator';

export class GetAsbBpsGalleryDetailDto {
    @IsNumber()
    id: number;
}
