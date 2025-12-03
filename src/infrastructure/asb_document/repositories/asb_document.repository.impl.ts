import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { AsbDocument } from '../../../domain/asb_document/asb_document.entity';
import { AsbDocumentRepository } from '../../../domain/asb_document/asb_document.repository';
import { AsbDocumentOrmEntity } from '../orm/asb_document.orm_entity';
import { DocumentSpec } from '../../../domain/asb_document/document_spec.enum';
import { CreateAsbDocumentDto } from '../../../presentation/asb_document/dto/create_asb_document.dto';
import { UpdateAsbDocumentDto } from '../../../presentation/asb_document/dto/update_asb_document.dto';
import { GetAsbDocumentListFilterDto } from '../../../presentation/asb_document/dto/get_asb_document_list_filter.dto';

@Injectable()
export class AsbDocumentRepositoryImpl extends AsbDocumentRepository {
    constructor(
        @InjectRepository(AsbDocumentOrmEntity)
        private readonly repository: Repository<AsbDocumentOrmEntity>,
    ) {
        super();
    }

    async create(
        dto: CreateAsbDocumentDto,
        filename: string,
    ): Promise<AsbDocument> {
        try {
            const ormEntity = this.repository.create({
                filename: filename,
                spec: dto.spec,
            });

            const saved = await this.repository.save(ormEntity);
            return plainToInstance(AsbDocument, saved);
        } catch (error) {
            throw error;
        }
    }

    async update(
        id: number,
        dto: UpdateAsbDocumentDto,
        filename?: string,
    ): Promise<AsbDocument> {
        try {
            const existing = await this.repository.findOne({ where: { id } });
            if (!existing) {
                throw new Error(`AsbDocument with id ${id} not found`);
            }

            const updateData: Partial<AsbDocumentOrmEntity> = {};

            if (dto.spec !== undefined) {
                updateData.spec = dto.spec;
            }
            if (dto.idAsb !== undefined) {
                updateData.idAsb = dto.idAsb;
            }
            if (filename !== undefined) {
                updateData.filename = filename;
            }

            await this.repository.update(id, updateData);

            const updated = await this.repository.findOne({ where: { id } });
            return plainToInstance(AsbDocument, updated);
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            const result = await this.repository.softDelete(id);
            if (result.affected === 0) {
                throw new Error(`AsbDocument with id ${id} not found`);
            }
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<AsbDocument | null> {
        try {
            const entity = await this.repository.findOne({ where: { id } });
            return entity ? plainToInstance(AsbDocument, entity) : null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(
        page: number,
        amount: number,
        filters?: GetAsbDocumentListFilterDto,
    ): Promise<[AsbDocument[], number]> {
        try {
            const queryBuilder = this.repository.createQueryBuilder('document');

            if (filters?.spec) {
                queryBuilder.andWhere('document.spec = :spec', {
                    spec: filters.spec,
                });
            }

            if (filters?.filename) {
                queryBuilder.andWhere('document.filename LIKE :filename', {
                    filename: `%${filters.filename}%`,
                });
            }

            const [entities, total] = await queryBuilder
                .skip((page - 1) * amount)
                .take(amount)
                .getManyAndCount();

            const domainEntities = entities.map((e) =>
                plainToInstance(AsbDocument, e),
            );
            return [domainEntities, total];
        } catch (error) {
            throw error;
        }
    }

    async findBySpec(spec: DocumentSpec): Promise<AsbDocument[]> {
        try {
            const entities = await this.repository.find({
                where: { spec },
            });
            return entities.map((e) => plainToInstance(AsbDocument, e));
        } catch (error) {
            throw error;
        }
    }

    async findByAsb(idAsb: number, page: number, amount: number): Promise<[AsbDocument[], number]> {
        try {
            const [entities, total] = await this.repository.findAndCount({
                where: { idAsb },
                skip: (page - 1) * amount,
                take: amount,
                order: { id: 'DESC' }
            });
            const domainEntities = entities.map((e) => plainToInstance(AsbDocument, e));
            return [domainEntities, total];
        } catch (error) {
            throw error;
        }
    }

    async findByAsbIdAll(idAsb: number): Promise<AsbDocument[]> {
        try {
            const entities = await this.repository.find({
                where: { idAsb }
            });
            return entities.map((e) => plainToInstance(AsbDocument, e));
        } catch (error) {
            throw error;
        }
    }
}
