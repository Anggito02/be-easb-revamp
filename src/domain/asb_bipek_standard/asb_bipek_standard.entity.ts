import { Files } from '../asb_detail/files.enum';
import { CalculationMethod } from './calculation_method.enum';

export class AsbBipekStandard {
    id: number;
    files: Files;
    idAsbKomponenBangunan: number | null;
    bobotInput: number | null;
    bobotInputProsentase: number | null;
    calculationMethod: CalculationMethod | null;
    jumlahBobot: number | null;
    rincianHarga: number | null;
}
