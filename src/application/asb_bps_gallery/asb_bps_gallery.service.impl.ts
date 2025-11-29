import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { AsbBpsGallery } from '../../domain/asb_bps_gallery/asb_bps_gallery.entity';
import { AsbBpsGalleryService } from '../../domain/asb_bps_gallery/asb_bps_gallery.service';
import { AsbBpsGalleryRepository } from '../../domain/asb_bps_gallery/asb_bps_gallery.repository';
import { ValidateFileUploadUseCase } from './use_cases/validate_file_upload.use_case';
import { EnsureUploadDirectoryUseCase } from './use_cases/ensure_upload_directory.use_case';
import { SaveFileUseCase } from './use_cases/save_file.use_case';
import { DeleteFileUseCase } from './use_cases/delete_file.use_case';
import { CreateAsbBpsGalleryDto } from '../../presentation/asb_bps_gallery/dto/create_asb_bps_gallery.dto';
import { UpdateAsbBpsGalleryDto } from '../../presentation/asb_bps_gallery/dto/update_asb_bps_gallery.dto';
import { GetAsbBpsGalleryListFilterDto } from '../../presentation/asb_bps_gallery/dto/get_asb_bps_gallery_list_filter.dto';
import { GetAsbBpsGalleryByAsbDto } from '../../presentation/asb_bps_gallery/dto/get_asb_bps_gallery_by_asb.dto';

@Injectable()
export class AsbBpsGalleryServiceImpl extends AsbBpsGalleryService {
    constructor(
        private readonly repository: AsbBpsGalleryRepository,
        private readonly validateFileUpload: ValidateFileUploadUseCase,
        private readonly ensureUploadDir: EnsureUploadDirectoryUseCase,
        private readonly saveFile: SaveFileUseCase,
        private readonly deleteFile: DeleteFileUseCase,
    ) {
        super();
        // Ensure upload directory exists on service initialization
        this.ensureUploadDir.execute();
    }

    async create(
        dto: CreateAsbBpsGalleryDto,
        file: Express.Multer.File,
    ): Promise<AsbBpsGallery> {
        try {
            // Validate file
            this.validateFileUpload.execute(file);

            // Save file and get path
            const filepath = this.saveFile.execute(file);

            // Pass DTO and filename to repository, DB handles autoincrement
            return await this.repository.create(dto, filepath);
        } catch (error) {
            throw error;
        }
    }

    async update(
        id: number,
        dto: UpdateAsbBpsGalleryDto,
        file?: Express.Multer.File,
    ): Promise<AsbBpsGallery> {
        try {
            const existing = await this.repository.findById(id);
            if (!existing) {
                throw new NotFoundException(
                    `AsbBpsGallery with id ${id} not found`,
                );
            }

            let filepath: string | undefined = undefined;

            // If new file is provided, replace the old one
            if (file) {
                this.validateFileUpload.execute(file);

                // Delete old file
                this.deleteFile.execute(existing.filename);

                // Save new file
                filepath = this.saveFile.execute(file);
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
                    `AsbBpsGallery with id ${id} not found`,
                );
            }

            // Delete file from disk
            this.deleteFile.execute(existing.filename);

            // Soft delete from database
            await this.repository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<AsbBpsGallery> {
        try {
            const entity = await this.repository.findById(id);
            if (!entity) {
                throw new NotFoundException(
                    `AsbBpsGallery with id ${id} not found`,
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
        filters?: GetAsbBpsGalleryListFilterDto,
    ): Promise<{ data: AsbBpsGallery[]; total: number }> {
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

    async findByKomponenBangunanId(id: number): Promise<AsbBpsGallery[]> {
        try {
            return await this.repository.findByKomponenBangunanId(id);
        } catch (error) {
            throw error;
        }
    }

    async getByAsb(dto: GetAsbBpsGalleryByAsbDto): Promise<{ data: AsbBpsGallery[], total: number, page: number, amount: number, totalPages: number }> {
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
}
