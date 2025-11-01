export class Asb {
    constructor(
        public id: number | null,
        public name: string,
        public jenisBangunan: string,
        public klasifikasi: string,
        public rekomendasiFile?: string,
        public status: number = 1,
    ) {}
}
