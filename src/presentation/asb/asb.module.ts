import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsbOrmEntity } from '../../infrastructure/asb/orm/asb.orm_entity';
import { AsbRepository } from '../../domain/asb/asb.repository';
import { AsbRepositoryImpl } from 'src/infrastructure/asb/repositories/asb.repository.impl';
import { AsbService } from '../../domain/asb/asb.service';
import { AsbServiceImpl } from '../../application/asb/asb.service.impl';
import { AsbController } from './asb.controller';
import { KabKotaModule } from '../kabkota/kabkota.module';
import { AsbStatusModule } from '../asb_status/asb_status.module';
import { AsbJenisModule } from '../asb_jenis/asb_jenis.module';
import { OpdModule } from '../opd/opd.module';
import { AsbTipeBangunanModule } from '../asb_tipe_bangunan/asb_tipe_bangunan.module';
import { RekeningModule } from '../rekening/rekening.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([AsbOrmEntity]),
        KabKotaModule,
        AsbStatusModule,
        AsbJenisModule,
        OpdModule,
        AsbTipeBangunanModule,
        RekeningModule
    ],
    providers: [
        {
            provide: AsbRepository,
            useClass: AsbRepositoryImpl,
        },
        {
            provide: AsbService,
            useClass: AsbServiceImpl,
        },
    ],
    controllers: [AsbController],
    exports: [AsbService],
})
export class AsbModule { }
