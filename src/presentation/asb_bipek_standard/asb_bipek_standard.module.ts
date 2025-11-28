import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsbBipekStandardOrmEntity } from '../../infrastructure/asb_bipek_standard/orm/asb_bipek_standard.orm_entity';
import { AsbBipekStandardRepository } from '../../domain/asb_bipek_standard/asb_bipek_standard.repository';
import { AsbBipekStandardRepositoryImpl } from '../../infrastructure/asb_bipek_standard/repositories/asb_bipek_standard.repository.impl';
import { AsbBipekStandardService } from '../../domain/asb_bipek_standard/asb_bipek_standard.service';
import { AsbBipekStandardServiceImpl } from '../../application/asb_bipek_standard/asb_bipek_standard.service.impl';
import { AsbKomponenBangunanModule } from '../asb_komponen_bangunan/asb_komponen_bangunan.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([AsbBipekStandardOrmEntity]),
        AsbKomponenBangunanModule,
    ],
    providers: [
        {
            provide: AsbBipekStandardRepository,
            useClass: AsbBipekStandardRepositoryImpl,
        },
        {
            provide: AsbBipekStandardService,
            useClass: AsbBipekStandardServiceImpl,
        },
    ],
    exports: [AsbBipekStandardService],
})
export class AsbBipekStandardModule { }
