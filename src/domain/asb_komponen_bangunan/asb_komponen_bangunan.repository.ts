import { CreateAsbKomponenBangunanDto } from '../../presentation/asb_komponen_bangunan/dto/create_asb_komponen_bangunan.dto';
import { GetAsbKomponenBangunansDto } from '../../presentation/asb_komponen_bangunan/dto/get_asb_komponen_bangunans.dto';
import { AsbKomponenBangunan } from './asb_komponen_bangunan.entity';

export abstract class AsbKomponenBangunanRepository {
    abstract create(data: CreateAsbKomponenBangunanDto): Promise<AsbKomponenBangunan>;
    abstract update(id: number, data: Partial<AsbKomponenBangunan>): Promise<AsbKomponenBangunan>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<AsbKomponenBangunan | null>;
    abstract findByKomponen(komponen: string): Promise<AsbKomponenBangunan | null>;
    abstract findAll(pagination: GetAsbKomponenBangunansDto): Promise<{ data: AsbKomponenBangunan[], total: number }>;
}
