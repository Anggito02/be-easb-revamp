import { AsbKomponenBangunan } from '../../../domain/asb_komponen_bangunan/asb_komponen_bangunan.entity';

export class AsbKomponenBangunansPaginationResult {
    komponenBangunans!: AsbKomponenBangunan[];
    total!: number;
    page!: number;
    amount!: number;
    totalPages!: number;
}
