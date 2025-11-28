import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { AsbDetailReview } from '../../../domain/asb_detail_review/asb_detail_review.entity';
import { AsbDetailReviewRepository } from '../../../domain/asb_detail_review/asb_detail_review.repository';
import { AsbDetailReviewOrmEntity } from '../orm/asb_detail_review.orm_entity';
import { CreateAsbDetailReviewDto } from '../../../application/asb_detail_review/dto/create_asb_detail_review.dto';
import { UpdateAsbDetailReviewDto } from '../../../application/asb_detail_review/dto/update_asb_detail_review.dto';

@Injectable()
export class AsbDetailReviewRepositoryImpl extends AsbDetailReviewRepository {
    constructor(
        @InjectRepository(AsbDetailReviewOrmEntity)
        private readonly repository: Repository<AsbDetailReviewOrmEntity>,
    ) {
        super();
    }

    async create(dto: CreateAsbDetailReviewDto): Promise<AsbDetailReview> {
        try {
            const ormEntity = this.repository.create(dto);

            const saved = await this.repository.save(ormEntity);
            return plainToInstance(AsbDetailReview, saved);
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateAsbDetailReviewDto): Promise<AsbDetailReview> {
        try {
            const existing = await this.repository.findOne({
                where: { id: dto.id },
            });
            if (!existing) {
                throw new Error(
                    `AsbDetailReview with id ${dto.id} not found`,
                );
            }

            const updateData: Partial<AsbDetailReviewOrmEntity> = {};

            if (dto.idAsbDetail !== undefined) {
                updateData.idAsbDetail = dto.idAsbDetail;
            }
            if (dto.files !== undefined) {
                updateData.files = dto.files;
            }
            if (dto.idAsbLantai !== undefined) {
                updateData.idAsbLantai = dto.idAsbLantai;
            }
            if (dto.idAsbFungsiRuang !== undefined) {
                updateData.idAsbFungsiRuang = dto.idAsbFungsiRuang;
            }
            if (dto.asbFungsiRuangKoef !== undefined) {
                updateData.asbFungsiRuangKoef = dto.asbFungsiRuangKoef;
            }
            if (dto.lantaiKoef !== undefined) {
                updateData.lantaiKoef = dto.lantaiKoef;
            }
            if (dto.luas !== undefined) {
                updateData.luas = dto.luas;
            }

            await this.repository.update(dto.id, updateData);

            const updated = await this.repository.findOne({
                where: { id: dto.id },
            });
            return plainToInstance(AsbDetailReview, updated);
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            const result = await this.repository.softDelete(id);
            if (result.affected === 0) {
                throw new Error(`AsbDetailReview with id ${id} not found`);
            }
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<AsbDetailReview | null> {
        try {
            const entity = await this.repository.findOne({ where: { id } });
            return entity ? plainToInstance(AsbDetailReview, entity) : null;
        } catch (error) {
            throw error;
        }
    }
}
