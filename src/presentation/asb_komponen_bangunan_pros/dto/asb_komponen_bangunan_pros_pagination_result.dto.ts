import { AsbKomponenBangunanPros } from '../../../domain/asb_komponen_bangunan_pros/asb_komponen_bangunan_pros.entity';

export class AsbKomponenBangunanProsPaginationResult {
    komponenBangunanProsList!: AsbKomponenBangunanPros[];
    total!: number;
    page!: number;
    amount!: number;
    totalPages!: number;
}
