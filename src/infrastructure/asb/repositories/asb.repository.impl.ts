// infrastructure/asb/repositories/asb.repository.impl.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AsbRepository } from '../../../domain/asb/asb.repository';
import { AsbOrmEntity } from '../orm/asb.orm-entity';
import { Asb } from '../../../domain/asb/asb.entity';

@Injectable()
export class AsbRepositoryImpl implements AsbRepository {
    constructor(
        @InjectRepository(AsbOrmEntity)
        private repo: Repository<AsbOrmEntity>,
    ) {}

    async create(asb: Asb): Promise<Asb> {
        const entity = this.repo.create(asb as any);
        const saved = await this.repo.save(entity);
        return saved as Asb;
    }

    async update(asb: Asb): Promise<Asb> {
        await this.repo.update(asb.id, asb as any);
        return { ...asb };
    }

    async findById(id: number): Promise<Asb | null> {
        const entity = await this.repo.findOne({ where: { id } });
        return entity ? (entity as Asb) : null;
    }
}
