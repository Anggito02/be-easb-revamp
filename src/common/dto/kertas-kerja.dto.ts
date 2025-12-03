import { Asb } from '../../domain/asb/asb.entity';

export class KertasKerjaDto {
    title: string;
    tipe_bangunan: string;
    tanggal_cetak: string;
    dataAsb: Asb;
    shst: number;
    dataBps: {
        komponen: string;
        asb: {
            bobot_input?: number;
            jumlah_bobot?: number;
            rincian_harga?: number;
        };
    }[];
    dataBpns: {
        komponen: string;
        asb: {
            bobot_input?: number;
            jumlah_bobot?: number;
            rincian_harga?: number;
        };
    }[];
}
