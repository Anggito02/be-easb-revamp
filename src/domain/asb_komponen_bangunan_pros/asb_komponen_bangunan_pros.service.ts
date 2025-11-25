import { CreateAsbKomponenBangunanProsDto } from '../../presentation/asb_komponen_bangunan_pros/dto/create_asb_komponen_bangunan_pros.dto';
import { UpdateAsbKomponenBangunanProsDto } from '../../presentation/asb_komponen_bangunan_pros/dto/update_asb_komponen_bangunan_pros.dto';
import { DeleteAsbKomponenBangunanProsDto } from '../../presentation/asb_komponen_bangunan_pros/dto/delete_asb_komponen_bangunan_pros.dto';
import { GetAsbKomponenBangunanProsListDto } from '../../presentation/asb_komponen_bangunan_pros/dto/get_asb_komponen_bangunan_pros_list.dto';
import { GetAsbKomponenBangunanProsDetailDto } from '../../presentation/asb_komponen_bangunan_pros/dto/get_asb_komponen_bangunan_pros_detail.dto';
import { AsbKomponenBangunanProsPaginationResult } from '../../presentation/asb_komponen_bangunan_pros/dto/asb_komponen_bangunan_pros_pagination_result.dto';
import { AsbKomponenBangunanPros } from './asb_komponen_bangunan_pros.entity';

export abstract class AsbKomponenBangunanProsService {
    abstract create(data: CreateAsbKomponenBangunanProsDto): Promise<AsbKomponenBangunanPros>;
    abstract update(data: UpdateAsbKomponenBangunanProsDto): Promise<AsbKomponenBangunanPros>;
    abstract delete(data: DeleteAsbKomponenBangunanProsDto): Promise<boolean>;
    abstract getAll(pagination: GetAsbKomponenBangunanProsListDto): Promise<AsbKomponenBangunanProsPaginationResult>;
    abstract getDetail(data: GetAsbKomponenBangunanProsDetailDto): Promise<AsbKomponenBangunanPros>;
    abstract findByKomponenBangunanId(id: number): Promise<AsbKomponenBangunanPros[]>;
    abstract findByTipeBangunanId(id: number): Promise<AsbKomponenBangunanPros[]>;
}
