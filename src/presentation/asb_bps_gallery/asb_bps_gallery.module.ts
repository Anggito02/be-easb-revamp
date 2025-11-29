import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { AsbBpsGalleryOrmEntity } from '../../infrastructure/asb_bps_gallery/orm/asb_bps_gallery.orm_entity';
import { AsbBpsGalleryRepository } from '../../domain/asb_bps_gallery/asb_bps_gallery.repository';
import { AsbBpsGalleryRepositoryImpl } from '../../infrastructure/asb_bps_gallery/repositories/asb_bps_gallery.repository.impl';
import { AsbBpsGalleryService } from '../../domain/asb_bps_gallery/asb_bps_gallery.service';
import { AsbBpsGalleryServiceImpl } from 'src/application/asb_bps_gallery/asb_bps_gallery.service.impl';
import { ValidateFileUploadUseCase } from '../../application/asb_bps_gallery/use_cases/validate_file_upload.use_case';
import { EnsureUploadDirectoryUseCase } from '../../application/asb_bps_gallery/use_cases/ensure_upload_directory.use_case';
import { GenerateFilenameUseCase } from '../../application/asb_bps_gallery/use_cases/generate_filename.use_case';
import { SaveFileUseCase } from '../../application/asb_bps_gallery/use_cases/save_file.use_case';
import { DeleteFileUseCase } from '../../application/asb_bps_gallery/use_cases/delete_file.use_case';
import { AsbBpsGalleryController } from './asb_bps_gallery.controller';
import { AsbKomponenBangunanStdModule } from '../asb_komponen_bangunan/asb_komponen_bangunan_std.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([AsbBpsGalleryOrmEntity]),
        MulterModule.register({
            limits: {
                fileSize: 10 * 1024 * 1024, // 10MB
            },
            fileFilter: (req, file, cb) => {
                const allowedMimes = [
                    'image/jpeg',
                    'image/jpg',
                    'image/png',
                    'image/gif',
                    'image/webp',
                ];
                if (allowedMimes.includes(file.mimetype)) {
                    cb(null, true);
                } else {
                    cb(new Error('Invalid file type. Only images are allowed.'), false);
                }
            },
        }),
        AsbKomponenBangunanStdModule,
    ],
    controllers: [AsbBpsGalleryController],
    providers: [
        {
            provide: AsbBpsGalleryRepository,
            useClass: AsbBpsGalleryRepositoryImpl,
        },
        {
            provide: AsbBpsGalleryService,
            useClass: AsbBpsGalleryServiceImpl,
        },
        ValidateFileUploadUseCase,
        EnsureUploadDirectoryUseCase,
        GenerateFilenameUseCase,
        SaveFileUseCase,
        DeleteFileUseCase,
    ],
    exports: [AsbBpsGalleryService],
})
export class AsbBpsGalleryModule { }
