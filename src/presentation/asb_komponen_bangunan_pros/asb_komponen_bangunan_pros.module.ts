import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsbKomponenBangunanProsController } from './asb_komponen_bangunan_pros.controller';
import { AsbKomponenBangunanProsServiceImpl } from '../../application/asb_komponen_bangunan_pros/asb_komponen_bangunan_pros.service.impl';
import { AsbKomponenBangunanProsRepositoryImpl } from '../../infrastructure/asb_komponen_bangunan_pros/repositories/asb_komponen_bangunan_pros.repository.impl';
import { AsbKomponenBangunanProsOrmEntity } from '../../infrastructure/asb_komponen_bangunan_pros/orm/asb_komponen_bangunan_pros.orm_entity';
import { AsbKomponenBangunanProsService } from '../../domain/asb_komponen_bangunan_pros/asb_komponen_bangunan_pros.service';
import { AsbKomponenBangunanProsRepository } from '../../domain/asb_komponen_bangunan_pros/asb_komponen_bangunan_pros.repository';
import { ValidateStatisticalRangeUseCase } from '../../application/asb_komponen_bangunan_pros/use_cases/validate_statistical_range.use_case';
import { AsbKomponenBangunanModule } from '../asb_komponen_bangunan/asb_komponen_bangunan_std.module';
import { AsbTipeBangunanModule } from '../asb_tipe_bangunan/asb_tipe_bangunan.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([AsbKomponenBangunanProsOrmEntity]),
        AsbKomponenBangunanModule,
        AsbTipeBangunanModule,
    ],
    controllers: [AsbKomponenBangunanProsController],
    providers: [
        {
            provide: AsbKomponenBangunanProsService,
            useClass: AsbKomponenBangunanProsServiceImpl,
        },
        {
            provide: AsbKomponenBangunanProsRepository,
            useClass: AsbKomponenBangunanProsRepositoryImpl,
        },
        ValidateStatisticalRangeUseCase,
    ],
    exports: [
        AsbKomponenBangunanProsService,
        AsbKomponenBangunanProsRepository,
    ],
})
export class AsbKomponenBangunanProsModule { }
