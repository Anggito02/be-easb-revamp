import { Injectable } from '@nestjs/common';
import { AsbRepository } from '../../domain/asb/asb.repository';
import { CreateAsbUseCase } from '../../domain/asb/use-cases/create_asb.use_case';
import { Asb } from '../../domain/asb/asb.entity';

@Injectable()
export class AsbService {
    private readonly createAsbUseCase: CreateAsbUseCase;

    constructor(private readonly asbRepo: AsbRepository) {
        this.createAsbUseCase = new CreateAsbUseCase(asbRepo);
    }

    async create(data: {
        name: string;
        jenisBangunan: string;
        klasifikasi: string;
        rekomendasiFile?: string;
    }): Promise<Asb> {
        return this.createAsbUseCase.execute(data);
    }

    async findById(id: number): Promise<Asb | null> {
        return this.asbRepo.findById(id);
    }

    // stub for lantai update; implement per use-case logic
    async updateLantai(_asbId: number, _details: any): Promise<void> {
        /* implement UpdateLantaiUseCase */
    }
}
