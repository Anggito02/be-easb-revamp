export class AsbWithRelationsDto {
    id: number;
    idAsbJenis: number;
    idAsbStatus: number;
    idOpd: number;
    idAsbTipeBangunan: number;
    idRekening: number | null;
    idRekeningReview: number | null;
    idKabkota: number | null;
    idAsbKlasifikasi: number | null;
    tahunAnggaran: number | null;
    namaAsb: string;
    alamat: string | null;
    jumlahKontraktor: number | null;
    totalLantai: number | null;
    rejectReason: string | null;
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

    // Related entities
    kabkota?: {
        id: number;
        namaKabkota: string;
        idProvinsi: number;
    } | null;

    asbStatus?: {
        id: number;
        status: string;
    };

    asbJenis?: {
        id: number;
        jenis: string;
    };

    opd?: {
        id: number;
        opd: string;
        alias: string;
    };

    tipeBangunan?: {
        id: number;
        tipeBangunan: string;
    };
}
