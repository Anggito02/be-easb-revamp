import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { AsbRepository } from '../../../domain/asb/asb.repository';
import { AsbOrmEntity } from '../orm/asb.orm_entity';
import { AsbWithRelationsDto } from 'src/application/asb/dto/asb_with_relations.dto';

@Injectable()
export class AsbRepositoryImpl implements AsbRepository {
    constructor(
        @InjectRepository(AsbOrmEntity)
        private readonly repo: Repository<AsbOrmEntity>,
    ) { }

    async findById(id: number, idOpd?: number): Promise<AsbWithRelationsDto | null> {
        const whereClause: any = { id };

        // Add OPD filter if provided
        if (!idOpd) {
            whereClause.idOpd = idOpd;
        }

        const entity = await this.repo.findOne({
            where: whereClause,
            relations: ['kabkota', 'asbStatus', 'asbJenis', 'opd'],
        });

        if (!entity) {
            return null;
        }

        return plainToInstance(AsbWithRelationsDto, entity);
    }
}
