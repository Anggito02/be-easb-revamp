import { Files } from '../asb_detail/files.enum';

export class AsbBipekNonStd {
    id: number;
    idAsb: number | null;
    files: Files;
    idAsbKomponenBangunan: number | null;
    bobotInput: number | null;
    jumlahBobot: number | null;
    rincianHarga: number | null;
}
