import { AsbBpsGallery } from './asb_bps_gallery.entity';
import { CreateAsbBpsGalleryDto } from '../../presentation/asb_bps_gallery/dto/create_asb_bps_gallery.dto';
import { UpdateAsbBpsGalleryDto } from '../../presentation/asb_bps_gallery/dto/update_asb_bps_gallery.dto';
import { GetAsbBpsGalleryListFilterDto } from '../../presentation/asb_bps_gallery/dto/get_asb_bps_gallery_list_filter.dto';

export abstract class AsbBpsGalleryRepository {
    abstract create(
        dto: CreateAsbBpsGalleryDto,
        filename: string,
    ): Promise<AsbBpsGallery>;
    abstract update(
        id: number,
        dto: UpdateAsbBpsGalleryDto,
        filename?: string,
    ): Promise<AsbBpsGallery>;
    abstract delete(id: number): Promise<void>;
    abstract findById(id: number): Promise<AsbBpsGallery | null>;
    abstract findAll(
        page: number,
        amount: number,
        filters?: GetAsbBpsGalleryListFilterDto,
    ): Promise<[AsbBpsGallery[], number]>;
    abstract findByKomponenBangunanId(id: number): Promise<AsbBpsGallery[]>;
    abstract findByAsb(idAsb: number, page: number, amount: number): Promise<[AsbBpsGallery[], number]>;
}
