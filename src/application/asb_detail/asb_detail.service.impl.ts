import { Injectable, NotFoundException } from '@nestjs/common';
import { AsbDetail } from '../../domain/asb_detail/asb_detail.entity';
import { AsbDetailService } from '../../domain/asb_detail/asb_detail.service';
import { AsbDetailRepository } from '../../domain/asb_detail/asb_detail.repository';
import { Files } from '../../domain/asb_detail/files.enum';
import { CreateAsbDetailDto } from './dto/create_asb_detail.dto';
import { UpdateAsbDetailDto } from './dto/update_asb_detail.dto';

@Injectable()
export class AsbDetailServiceImpl extends AsbDetailService {
    constructor(private readonly repository: AsbDetailRepository) {
        super();
    }

    async create(dto: CreateAsbDetailDto): Promise<AsbDetail> {
        try {
            return await this.repository.create(dto);
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateAsbDetailDto): Promise<AsbDetail> {
        try {
            const existing = await this.repository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(
                    `AsbDetail with id ${dto.id} not found`,
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
                    `AsbDetail with id ${id} not found`,
                );
            }

            await this.repository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    async getById(id: number): Promise<AsbDetail> {
        try {
            const detail = await this.repository.findById(id);
            if (!detail) {
                throw new NotFoundException(
                    `AsbDetail with id ${id} not found`,
                );
            }
            return detail;
        } catch (error) {
            throw error;
        }
    }

    async getByFileType(files: Files): Promise<AsbDetail[]> {
        try {
            return await this.repository.findByFileType(files);
        } catch (error) {
            throw error;
        }
    }
}
