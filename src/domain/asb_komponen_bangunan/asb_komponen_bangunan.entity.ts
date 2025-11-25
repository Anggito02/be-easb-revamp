import { AsbKomponenBangunanFiles } from './asb_komponen_bangunan_files.enum';

export class AsbKomponenBangunan {
    id!: number;
    komponen!: string;
    files!: AsbKomponenBangunanFiles;
    idAsbJenis!: number;
}
