import { Injectable, NotFoundException } from '@nestjs/common';
import { AsbBipekNonStdReview } from '../../domain/asb_bipek_non_std_review/asb_bipek_non_std_review.entity';
import { AsbBipekNonStdReviewService } from '../../domain/asb_bipek_non_std_review/asb_bipek_non_std_review.service';
import { AsbBipekNonStdReviewRepository } from '../../domain/asb_bipek_non_std_review/asb_bipek_non_std_review.repository';
import { CreateAsbBipekNonStdReviewDto } from './dto/create_asb_bipek_non_std_review.dto';
import { UpdateAsbBipekNonStdReviewDto } from './dto/update_asb_bipek_non_std_review.dto';

@Injectable()
export class AsbBipekNonStdReviewServiceImpl extends AsbBipekNonStdReviewService {
    constructor(
        private readonly repository: AsbBipekNonStdReviewRepository,
    ) {
        super();
    }

    async create(
        dto: CreateAsbBipekNonStdReviewDto,
    ): Promise<AsbBipekNonStdReview> {
        try {
            return await this.repository.create(dto);
        } catch (error) {
            throw error;
        }
    }

    async update(
        dto: UpdateAsbBipekNonStdReviewDto,
    ): Promise<AsbBipekNonStdReview> {
        try {
            const existing = await this.repository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(
                    `AsbBipekNonStdReview with id ${dto.id} not found`,
                );
            }

            return await this.repository.update(dto);
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            const existing = await this.repository.findById(id);
            if (!existing) {
                throw new NotFoundException(
                    `AsbBipekNonStdReview with id ${id} not found`,
                );
            }

            await this.repository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    async getById(id: number): Promise<AsbBipekNonStdReview> {
        try {
            const bipekNonStdReview = await this.repository.findById(id);
            if (!bipekNonStdReview) {
                throw new NotFoundException(
                    `AsbBipekNonStdReview with id ${id} not found`,
                );
            }
            return bipekNonStdReview;
        } catch (error) {
            throw error;
        }
    }
}
