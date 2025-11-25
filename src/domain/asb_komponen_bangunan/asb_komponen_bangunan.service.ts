import { CreateAsbKomponenBangunanDto } from '../../presentation/asb_komponen_bangunan/dto/create_asb_komponen_bangunan.dto';
import { UpdateAsbKomponenBangunanDto } from '../../presentation/asb_komponen_bangunan/dto/update_asb_komponen_bangunan.dto';
import { DeleteAsbKomponenBangunanDto } from '../../presentation/asb_komponen_bangunan/dto/delete_asb_komponen_bangunan.dto';
import { GetAsbKomponenBangunansDto } from '../../presentation/asb_komponen_bangunan/dto/get_asb_komponen_bangunans.dto';
import { GetAsbKomponenBangunanDetailDto } from '../../presentation/asb_komponen_bangunan/dto/get_asb_komponen_bangunan_detail.dto';
import { AsbKomponenBangunansPaginationResult } from '../../presentation/asb_komponen_bangunan/dto/asb_komponen_bangunan_pagination_result.dto';
import { AsbKomponenBangunan } from './asb_komponen_bangunan.entity';

export abstract class AsbKomponenBangunanService {
    abstract create(data: CreateAsbKomponenBangunanDto): Promise<AsbKomponenBangunan>;
    abstract update(data: UpdateAsbKomponenBangunanDto): Promise<AsbKomponenBangunan>;
    abstract delete(data: DeleteAsbKomponenBangunanDto): Promise<boolean>;
    abstract getAll(pagination: GetAsbKomponenBangunansDto): Promise<AsbKomponenBangunansPaginationResult>;
    abstract getDetail(data: GetAsbKomponenBangunanDetailDto): Promise<AsbKomponenBangunan>;
    abstract findByKomponen(komponen: string): Promise<AsbKomponenBangunan | null>;
}
