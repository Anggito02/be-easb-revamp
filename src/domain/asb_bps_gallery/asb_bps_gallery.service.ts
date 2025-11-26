import { AsbBpsGallery } from './asb_bps_gallery.entity';
import { CreateAsbBpsGalleryDto } from '../../presentation/asb_bps_gallery/dto/create_asb_bps_gallery.dto';
import { UpdateAsbBpsGalleryDto } from '../../presentation/asb_bps_gallery/dto/update_asb_bps_gallery.dto';
import { GetAsbBpsGalleryListFilterDto } from '../../presentation/asb_bps_gallery/dto/get_asb_bps_gallery_list_filter.dto';

export abstract class AsbBpsGalleryService {
    abstract create(
        dto: CreateAsbBpsGalleryDto,
        file: Express.Multer.File,
    ): Promise<AsbBpsGallery>;
    abstract update(
        id: number,
        dto: UpdateAsbBpsGalleryDto,
        file?: Express.Multer.File,
    ): Promise<AsbBpsGallery>;
    abstract delete(id: number): Promise<void>;
    abstract findById(id: number): Promise<AsbBpsGallery>;
    abstract findAll(
        page: number,
        amount: number,
        filters?: GetAsbBpsGalleryListFilterDto,
    ): Promise<{ data: AsbBpsGallery[]; total: number }>;
    abstract findByKomponenBangunanId(id: number): Promise<AsbBpsGallery[]>;
}
