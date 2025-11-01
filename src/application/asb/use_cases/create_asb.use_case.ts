import { AsbRepository } from '../../../domain/asb/asb.repository';
import { Asb } from '../../../domain/asb/asb.entity';
import { CreateAsbDto } from 'src/presentation/asb/dto/create_asb.dto';

export class CreateAsbUseCase {
    constructor(private readonly asbRepo: AsbRepository) {}

    async execute(data: CreateAsbDto): Promise<Asb> {
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
