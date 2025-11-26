import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { AsbBpsGallery } from '../../../domain/asb_bps_gallery/asb_bps_gallery.entity';
import { AsbBpsGalleryRepository } from '../../../domain/asb_bps_gallery/asb_bps_gallery.repository';
import { AsbBpsGalleryOrmEntity } from '../orm/asb_bps_gallery.orm_entity';
import { CreateAsbBpsGalleryDto } from '../../../presentation/asb_bps_gallery/dto/create_asb_bps_gallery.dto';
import { UpdateAsbBpsGalleryDto } from '../../../presentation/asb_bps_gallery/dto/update_asb_bps_gallery.dto';
import { GetAsbBpsGalleryListFilterDto } from '../../../presentation/asb_bps_gallery/dto/get_asb_bps_gallery_list_filter.dto';

@Injectable()
export class AsbBpsGalleryRepositoryImpl extends AsbBpsGalleryRepository {
    constructor(
        @InjectRepository(AsbBpsGalleryOrmEntity)
        private readonly repository: Repository<AsbBpsGalleryOrmEntity>,
    ) {
        super();
    }

    async create(
        dto: CreateAsbBpsGalleryDto,
        filename: string,
    ): Promise<AsbBpsGallery> {
        try {
            const ormEntity = this.repository.create({
                idAsbKomponenBangunan: dto.idAsbKomponenBangunan || null,
                filename: filename,
                jumlahBobot: dto.jumlahBobot || null,
                rincianHarga: dto.rincianHarga || null,
            });

            const saved = await this.repository.save(ormEntity);
            return plainToInstance(AsbBpsGallery, saved);
        } catch (error) {
            throw error;
        }
    }

    async update(
        id: number,
        dto: UpdateAsbBpsGalleryDto,
        filename?: string,
    ): Promise<AsbBpsGallery> {
        try {
            const existing = await this.repository.findOne({ where: { id } });
            if (!existing) {
                throw new Error(`AsbBpsGallery with id ${id} not found`);
            }

            const updateData: Partial<AsbBpsGalleryOrmEntity> = {};

            if (dto.idAsbKomponenBangunan !== undefined) {
                updateData.idAsbKomponenBangunan = dto.idAsbKomponenBangunan;
            }
            if (dto.jumlahBobot !== undefined) {
                updateData.jumlahBobot = dto.jumlahBobot;
            }
            if (dto.rincianHarga !== undefined) {
                updateData.rincianHarga = dto.rincianHarga;
            }
            if (filename !== undefined) {
                updateData.filename = filename;
            }

            await this.repository.update(id, updateData);

            const updated = await this.repository.findOne({ where: { id } });
            return plainToInstance(AsbBpsGallery, updated);
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            const result = await this.repository.softDelete(id);
            if (result.affected === 0) {
                throw new Error(`AsbBpsGallery with id ${id} not found`);
            }
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<AsbBpsGallery | null> {
        try {
            const entity = await this.repository.findOne({ where: { id } });
            return entity ? plainToInstance(AsbBpsGallery, entity) : null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(
        page: number,
        amount: number,
        filters?: GetAsbBpsGalleryListFilterDto,
    ): Promise<[AsbBpsGallery[], number]> {
        try {
            const queryBuilder = this.repository.createQueryBuilder('gallery');

            if (filters?.idAsbKomponenBangunan) {
                queryBuilder.andWhere(
                    'gallery.idAsbKomponenBangunan = :idAsbKomponenBangunan',
                    { idAsbKomponenBangunan: filters.idAsbKomponenBangunan },
                );
            }

            if (filters?.filename) {
                queryBuilder.andWhere('gallery.filename LIKE :filename', {
                    filename: `%${filters.filename}%`,
                });
            }

            if (filters?.jumlahBobot !== undefined) {
                queryBuilder.andWhere('gallery.jumlahBobot = :jumlahBobot', {
                    jumlahBobot: filters.jumlahBobot,
                });
            }

            if (filters?.rincianHarga !== undefined) {
                queryBuilder.andWhere('gallery.rincianHarga = :rincianHarga', {
                    rincianHarga: filters.rincianHarga,
                });
            }

            const [entities, total] = await queryBuilder
                .skip((page - 1) * amount)
                .take(amount)
                .getManyAndCount();

            const domainEntities = entities.map((e) =>
                plainToInstance(AsbBpsGallery, e),
            );
            return [domainEntities, total];
        } catch (error) {
            throw error;
        }
    }

    async findByKomponenBangunanId(id: number): Promise<AsbBpsGallery[]> {
        try {
            const entities = await this.repository.find({
                where: { idAsbKomponenBangunan: id },
            });
            return entities.map((e) => plainToInstance(AsbBpsGallery, e));
        } catch (error) {
            throw error;
        }
    }
}
