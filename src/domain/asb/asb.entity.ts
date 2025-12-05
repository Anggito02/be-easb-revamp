import { KabKota } from '../kabkota/kabkota.entity';
import { Opd } from '../opd/opd.entity';
import { AsbStatus } from '../asb_status/asb_status.entity';
import { AsbJenis } from '../asb_jenis/asb_jenis.entity';
import { User } from '../user/user.entity';

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
    idVerifikatorAdpem: number | null;
    idVerifikatorBPKAD: number | null;
    idVerifikatorBappeda: number | null;

    // Core fields
    tahunAnggaran: number | null;
    namaAsb: string;
    alamat: string | null;
    jumlahKontraktor: number | null;
    totalLantai: number | null;
    luasTanah: number | null;
    verifiedAdpemAt: Date | null;
    verifiedBpkadAt: Date | null;
    verifiedBappedaAt: Date | null;
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
    nominalBps: number | null;
    nominalBpns: number | null;
    bobotTotalBps: number | null;
    bobotTotalBpns: number | null;
    rekapitulasiBiayaKonstruksi: number | null;
    rekapitulasiBiayaKonstruksiRounded: number | null;

    // Relations
    kabkota?: KabKota | null;
    opd?: Opd;
    asbStatus?: AsbStatus;
    asbJenis?: AsbJenis;
    verifikatorAdpem?: User | null;
    verifikatorBPKAD?: User | null;
    verifikatorBappeda?: User | null;
}
