import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsbDetailOrmEntity } from '../../infrastructure/asb_detail/orm/asb_detail.orm_entity';
import { AsbDetailRepository } from '../../domain/asb_detail/asb_detail.repository';
import { AsbDetailRepositoryImpl } from '../../infrastructure/asb_detail/repositories/asb_detail.repository.impl';
import { AsbDetailService } from '../../domain/asb_detail/asb_detail.service';
import { AsbDetailServiceImpl } from '../../application/asb_detail/asb_detail.service.impl';
import { AsbLantaiModule } from '../asb_lantai/asb_lantai.module';
import { AsbFungsiRuangModule } from '../asb_fungsi_ruang/asb_fungsi_ruang.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([AsbDetailOrmEntity]),
        AsbLantaiModule,
        AsbFungsiRuangModule,
    ],
    providers: [
        {
            provide: AsbDetailRepository,
            useClass: AsbDetailRepositoryImpl,
        },
        {
            provide: AsbDetailService,
            useClass: AsbDetailServiceImpl,
        },
    ],
    exports: [AsbDetailService],
})
export class AsbDetailModule { }
