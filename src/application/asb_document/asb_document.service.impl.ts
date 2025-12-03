import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { AsbDocument } from '../../domain/asb_document/asb_document.entity';
import { AsbDocumentService } from '../../domain/asb_document/asb_document.service';
import { AsbDocumentRepository } from '../../domain/asb_document/asb_document.repository';
import { DocumentSpec } from '../../domain/asb_document/document_spec.enum';
import { ValidateDocumentUploadUseCase } from './use_cases/validate_document_upload.use_case';
import { EnsureDocumentDirectoryUseCase } from './use_cases/ensure_document_directory.use_case';
import { SaveDocumentUseCase } from './use_cases/save_document.use_case';
import { DeleteDocumentUseCase } from './use_cases/delete_document.use_case';
import { CreateAsbDocumentDto } from '../../presentation/asb_document/dto/create_asb_document.dto';
import { UpdateAsbDocumentDto } from '../../presentation/asb_document/dto/update_asb_document.dto';
import { GetAsbDocumentListFilterDto } from '../../presentation/asb_document/dto/get_asb_document_list_filter.dto';
import { GetAsbDocumentByAsbDto } from '../../presentation/asb_document/dto/get_asb_document_by_asb.dto';
import { Express } from 'express';

@Injectable()
export class AsbDocumentServiceImpl extends AsbDocumentService {
    constructor(
        private readonly repository: AsbDocumentRepository,
        private readonly validateDocumentUpload: ValidateDocumentUploadUseCase,
        private readonly ensureDocumentDir: EnsureDocumentDirectoryUseCase,
        private readonly saveDocument: SaveDocumentUseCase,
        private readonly deleteDocument: DeleteDocumentUseCase,
    ) {
        super();
        // Ensure upload directory exists on service initialization
        this.ensureDocumentDir.execute();
    }

    async create(
        dto: CreateAsbDocumentDto,
        file: Express.Multer.File,
    ): Promise<AsbDocument> {
        try {
            // Validate file
            this.validateDocumentUpload.execute(file);

            // Save file with spec in filename
            const filepath = this.saveDocument.execute(file, dto.spec);

            // Pass DTO and filename to repository
            return await this.repository.create(dto, filepath);
        } catch (error) {
            throw error;
        }
    }

    async update(
        id: number,
        dto: UpdateAsbDocumentDto,
        file?: Express.Multer.File,
    ): Promise<AsbDocument> {
        try {
            const existing = await this.repository.findById(id);
            if (!existing) {
                throw new NotFoundException(
                    `AsbDocument with id ${id} not found`,
                );
            }

            let filepath: string | undefined = undefined;

            // If new file is provided, replace the old one
            if (file) {
                this.validateDocumentUpload.execute(file);

                // Delete old file
                this.deleteDocument.execute(existing.filename);

                // Save new file with spec (use updated spec if provided, otherwise existing)
                const spec = dto.spec !== undefined ? dto.spec : existing.spec;
                filepath = this.saveDocument.execute(file, spec);
            }

            // Pass DTO and optional filename to repository
            return await this.repository.update(id, dto, filepath);
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            const existing = await this.repository.findById(id);
            if (!existing) {
                throw new NotFoundException(
                    `AsbDocument with id ${id} not found`,
                );
            }

            // Delete file from disk
            this.deleteDocument.execute(existing.filename);

            // Soft delete from database
            await this.repository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<AsbDocument> {
        try {
            const entity = await this.repository.findById(id);
            if (!entity) {
                throw new NotFoundException(
                    `AsbDocument with id ${id} not found`,
                );
            }
            return entity;
        } catch (error) {
            throw error;
        }
    }

    async findAll(
        page: number,
        amount: number,
        filters?: GetAsbDocumentListFilterDto,
    ): Promise<{ data: AsbDocument[]; total: number }> {
        try {
            const [data, total] = await this.repository.findAll(
                page,
                amount,
                filters,
            );
            return { data, total };
        } catch (error) {
            throw error;
        }
    }

    async findBySpec(spec: DocumentSpec): Promise<AsbDocument[]> {
        try {
            return await this.repository.findBySpec(spec);
        } catch (error) {
            throw error;
        }
    }

    async getByAsb(dto: GetAsbDocumentByAsbDto): Promise<{ data: AsbDocument[], total: number, page: number, amount: number, totalPages: number }> {
        try {
            const [data, total] = await this.repository.findByAsb(dto.idAsb, dto.page, dto.amount);
            return {
                data,
                total,
                page: dto.page,
                amount: dto.amount,
                totalPages: Math.ceil(total / dto.amount)
            };
        } catch (error) {
            throw error;
        }
    }

    async deleteByAsbId(idAsb: number): Promise<void> {
        try {
            // Get all documents for this ASB
            const documents = await this.repository.findByAsbIdAll(idAsb);

            // Delete each document (this handles both file and DB deletion)
            for (const doc of documents) {
                await this.delete(doc.id);
            }
        } catch (error) {
            throw error;
        }
    }
}
