import { AsbBpsGallery } from '../../../domain/asb_bps_gallery/asb_bps_gallery.entity';

export class AsbBpsGalleryPaginationResultDto {
    data: AsbBpsGallery[];
    total: number;
    page: number;
    amount: number;
    totalPages: number;
}
