import { CreateAsbKomponenBangunanProsDto } from '../../presentation/asb_komponen_bangunan_pros/dto/create_asb_komponen_bangunan_pros.dto';
import { GetAsbKomponenBangunanProsListDto } from '../../presentation/asb_komponen_bangunan_pros/dto/get_asb_komponen_bangunan_pros_list.dto';
import { AsbKomponenBangunanPros } from './asb_komponen_bangunan_pros.entity';

export abstract class AsbKomponenBangunanProsRepository {
    abstract create(data: CreateAsbKomponenBangunanProsDto): Promise<AsbKomponenBangunanPros>;
    abstract update(id: number, data: Partial<AsbKomponenBangunanPros>): Promise<AsbKomponenBangunanPros>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<AsbKomponenBangunanPros | null>;
    abstract findAll(pagination: GetAsbKomponenBangunanProsListDto): Promise<{ data: AsbKomponenBangunanPros[], total: number }>;
    abstract findByKomponenBangunanId(id: number): Promise<AsbKomponenBangunanPros[]>;
    abstract findByTipeBangunanId(id: number): Promise<AsbKomponenBangunanPros[]>;
}
