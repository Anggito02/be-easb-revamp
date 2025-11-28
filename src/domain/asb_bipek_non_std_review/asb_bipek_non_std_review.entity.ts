import { Files } from '../asb_detail/files.enum';

export class AsbBipekNonStdReview {
    id: number;
    idAsbBipekNonStd: number;
    idAsbKomponenBangunan: number | null;
    files: Files;
    bobotInput: number | null;
    jumlahBobot: number | null;
    rincianHarga: number | null;
}
