import { AsbWithRelationsDto } from 'src/application/asb/dto/asb_with_relations.dto';
import { AsbDetailWithRelationDto } from 'src/application/asb_detail/dto/asb_detail_with_relation.dto';

export class KertasKerjaDto {
    title: string;
    tipe_bangunan: string | undefined;
    tanggal_cetak: string;
    dataAsb: AsbWithRelationsDto;
    dataAsbDetail: AsbDetailWithRelationDto[];
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
