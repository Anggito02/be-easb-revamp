import { AsbKomponenBangunanStd } from '../../../domain/asb_komponen_bangunan/asb_komponen_bangunan_std.entity';

export class AsbKomponenBangunanStdsPaginationResult {
    komponenBangunans!: AsbKomponenBangunanStd[];
    total!: number;
    page!: number;
    amount!: number;
    totalPages!: number;
}
