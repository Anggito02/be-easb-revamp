import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsbKomponenBangunanController } from './asb_komponen_bangunan.controller';
import { AsbKomponenBangunanServiceImpl } from '../../application/asb_komponen_bangunan/asb_komponen_bangunan.service.impl';
import { AsbKomponenBangunanRepositoryImpl } from '../../infrastructure/asb_komponen_bangunan/repositories/asb_komponen_bangunan.repository.impl';
import { AsbKomponenBangunanOrmEntity } from '../../infrastructure/asb_komponen_bangunan/orm/asb_komponen_bangunan.orm_entity';
import { AsbKomponenBangunanService } from '../../domain/asb_komponen_bangunan/asb_komponen_bangunan.service';
import { AsbKomponenBangunanRepository } from '../../domain/asb_komponen_bangunan/asb_komponen_bangunan.repository';
import { AsbJenisModule } from '../asb_jenis/asb_jenis.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([AsbKomponenBangunanOrmEntity]),
        AsbJenisModule,
    ],
    controllers: [AsbKomponenBangunanController],
    providers: [
        {
            provide: AsbKomponenBangunanService,
            useClass: AsbKomponenBangunanServiceImpl,
        },
        {
            provide: AsbKomponenBangunanRepository,
            useClass: AsbKomponenBangunanRepositoryImpl,
        },
    ],
    exports: [
        AsbKomponenBangunanService,
        AsbKomponenBangunanRepository,
    ],
})
export class AsbKomponenBangunanModule { }
