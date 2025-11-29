import { CreateAsbKomponenBangunanStdDto } from '../../presentation/asb_komponen_bangunan/dto/create_asb_komponen_bangunan_std.dto';
import { DeleteAsbKomponenBangunanStdDto } from '../../presentation/asb_komponen_bangunan/dto/delete_asb_komponen_bangunan_std.dto';
import { GetAsbKomponenBangunanStdsDto } from '../../presentation/asb_komponen_bangunan/dto/get_asb_komponen_bangunan_stds.dto';
import { GetAsbKomponenBangunanStdDetailDto } from '../../presentation/asb_komponen_bangunan/dto/get_asb_komponen_bangunan_std_detail.dto';
import { AsbKomponenBangunanStdsPaginationResult } from '../../presentation/asb_komponen_bangunan/dto/asb_komponen_bangunan_std_pagination_result.dto';
import { AsbKomponenBangunanStd } from './asb_komponen_bangunan_std.entity';
import { UpdateAsbKomponenBangunanStdDto } from '../../presentation/asb_komponen_bangunan/dto/update_asb_komponen_bangunan_std.dto';

export abstract class AsbKomponenBangunanStdService {
    abstract create(data: CreateAsbKomponenBangunanStdDto): Promise<AsbKomponenBangunanStd>;
    abstract update(data: UpdateAsbKomponenBangunanStdDto): Promise<AsbKomponenBangunanStd>;
    abstract delete(data: DeleteAsbKomponenBangunanStdDto): Promise<boolean>;
    abstract getAll(pagination: GetAsbKomponenBangunanStdsDto): Promise<AsbKomponenBangunanStdsPaginationResult>;
    abstract getDetail(data: GetAsbKomponenBangunanStdDetailDto): Promise<AsbKomponenBangunanStd>;
    abstract findByKomponen(komponen: string): Promise<AsbKomponenBangunanStd | null>;
}
