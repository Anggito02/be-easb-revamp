import { AsbRepository } from '../asb.repository';
import { Asb } from '../asb.entity';

export class CreateAsbUseCase {
    constructor(private readonly asbRepo: AsbRepository) {}

    async execute(data: {
        name: string;
        jenisBangunan: string;
        klasifikasi: string;
        rekomendasiFile?: string;
    }): Promise<Asb> {
        const asb = new Asb(
            null,
            data.name,
            data.jenisBangunan,
            data.klasifikasi,
            data.rekomendasiFile,
            1,
        );
        return this.asbRepo.create(asb);
    }
}
