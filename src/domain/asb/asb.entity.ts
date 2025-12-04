import { KabKota } from '../kabkota/kabkota.entity';
import { Opd } from '../opd/opd.entity';
import { AsbStatus } from '../asb_status/asb_status.entity';
import { AsbJenis } from '../asb_jenis/asb_jenis.entity';

export class Asb {
    id: number;

    // Required Foreign Keys
    idAsbJenis: number;
    idAsbStatus: number;
    idOpd: number;
    idAsbTipeBangunan: number;

    // Optional Foreign Keys
    idRekening: number | null;
    idRekeningReview: number | null;
    idKabkota: number | null;
    idAsbKlasifikasi: number | null;

    // Core fields
    tahunAnggaran: number | null;
    namaAsb: string;
    alamat: string | null;
    jumlahKontraktor: number | null;
    totalLantai: number | null;
    rejectReason: string | null;

    // Double/numeric fields
    shst: number | null;
    perencanaanKonstruksi: number | null;
    pengawasanKonstruksi: number | null;
    managementKonstruksi: number | null;
    pengelolaanKegiatan: number | null;
    luasTotalBangunan: number | null;
    koefisienLantaiTotal: number | null;
    koefisienFungsiRuangTotal: number | null;
    totalBiayaPembangunan: number | null;

    // Relations
    kabkota?: KabKota | null;
    opd?: Opd;
    asbStatus?: AsbStatus;
    asbJenis?: AsbJenis;
}
