import { AsbWithRelationsDto } from 'src/application/asb/dto/asb_with_relations.dto';

export class KertasKerjaDto {
    title: string;
    tipe_bangunan: string | undefined;
    tanggal_cetak: string;
    dataAsb: AsbWithRelationsDto;
    shst: number | null;
    dataBps: {
        komponen: string | undefined;
        asb: {
            bobot_input: number;
            jumlah_bobot: number;
            rincian_harga: number;
        };
    }[];
    dataBpns: {
        komponen: string | undefined;
        asb: {
            bobot_input: number;
            jumlah_bobot: number;
            rincian_harga: number;
        };
    }[];
}
