import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import archiver from 'archiver';
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
import { KertasKerjaUseCase } from './use_cases/kertas_kerja.use_case';
import { KertasKerjaDto } from 'src/presentation/asb_document/dto/kertas_kerja.dto';
import { Readable } from 'typeorm/platform/PlatformTools.js';
import { SuratPermohonanDto } from 'src/presentation/asb_document/dto/surat_permohonan,dto';
import { SuratPermohonanUseCase } from './use_cases/surat_permohonan.use_case';

@Injectable()
export class AsbDocumentServiceImpl extends AsbDocumentService {
    constructor(
        private readonly repository: AsbDocumentRepository,
        private readonly validateDocumentUpload: ValidateDocumentUploadUseCase,
        private readonly ensureDocumentDir: EnsureDocumentDirectoryUseCase,
        private readonly saveDocument: SaveDocumentUseCase,
        private readonly deleteDocument: DeleteDocumentUseCase,
        private readonly kertasKerjaUseCase: KertasKerjaUseCase,
        private readonly suratPermohonanUseCase: SuratPermohonanUseCase
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

    async generateAsbKertasKerja(dto: KertasKerjaDto): Promise<boolean> {
        try {
            const asbDoc = await this.kertasKerjaUseCase.execute(dto)
            const file: Express.Multer.File = {
                buffer: asbDoc,
                originalname: `${dto.dataAsb.opd?.opd}.pdf`,
                size: asbDoc.length,
                encoding: '7bit',
                mimetype: 'application/pdf',
                destination: '',
                filename: '',
                path: '',
                fieldname: '',
                stream: Readable.from(asbDoc),
            };

            const filepath = this.saveDocument.execute(file, DocumentSpec.KERTAS_KERJA);

            await this.repository.create({
                idAsb: dto.dataAsb.id,
                spec: DocumentSpec.KERTAS_KERJA,
            }, filepath);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async generateSuratPermohonan(dto: SuratPermohonanDto): Promise<boolean> {
        try {
            const asbDoc = await this.suratPermohonanUseCase.execute(dto)
            const file: Express.Multer.File = {
                buffer: asbDoc,
                originalname: `${dto.opd}_${dto.nama_asb}.pdf`,
                size: asbDoc.length,
                encoding: '7bit',
                mimetype: 'application/pdf',
                destination: '',
                filename: '',
                path: '',
                fieldname: '',
                stream: Readable.from(asbDoc),
            };

            const filepath = this.saveDocument.execute(file, DocumentSpec.SURAT_PERMOHONAN);
            await this.repository.create({
                idAsb: dto.idAsb,
                spec: DocumentSpec.SURAT_PERMOHONAN,
            }, filepath);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async downloadAllByAsbAsZip(idAsb: number): Promise<{ buffer: Buffer, filename: string }> {
        try {
            // Get all documents for this ASB
            const documents = await this.repository.findByAsbIdAll(idAsb);

            if (!documents || documents.length === 0) {
                throw new NotFoundException(`No documents found for ASB with id ${idAsb}`);
            }

            // Create a buffer to store the zip file
            const chunks: Buffer[] = [];
            const archive = archiver('zip', {
                zlib: { level: 9 } // Maximum compression
            });

            // Listen for archive data
            archive.on('data', (chunk) => {
                chunks.push(chunk);
            });

            // Finalize promise
            const archivePromise = new Promise<Buffer>((resolve, reject) => {
                archive.on('end', () => {
                    resolve(Buffer.concat(chunks));
                });
                archive.on('error', (err) => {
                    reject(err);
                });
            });

            // Add each document to the archive
            for (const doc of documents) {
                if (fs.existsSync(doc.filename)) {
                    const fileBuffer = fs.readFileSync(doc.filename);
                    const fileName = path.basename(doc.filename);
                    archive.append(fileBuffer, { name: fileName });
                }
            }

            // Finalize the archive
            await archive.finalize();

            // Wait for the archive to complete
            const buffer = await archivePromise;

            return {
                buffer,
                filename: `asb_documents_${idAsb}.zip`
            };
        } catch (error) {
            throw error;
        }
    }

    async downloadByAsbAndSpec(idAsb: number, spec: DocumentSpec): Promise<{ buffer: Buffer, filename: string }> {
        try {
            // Get all documents for this ASB
            const documents = await this.repository.findByAsbIdAll(idAsb);

            // Filter by spec
            const document = documents.find(doc => doc.spec === spec);

            if (!document) {
                throw new NotFoundException(
                    `Document with spec ${spec} not found for ASB with id ${idAsb}`
                );
            }

            // Check if file exists
            if (!fs.existsSync(document.filename)) {
                throw new NotFoundException(
                    `File not found on disk: ${document.filename}`
                );
            }

            // Read the file
            const buffer = fs.readFileSync(document.filename);
            const filename = path.basename(document.filename);

            return {
                buffer,
                filename
            };
        } catch (error) {
            throw error;
        }
    }
}
