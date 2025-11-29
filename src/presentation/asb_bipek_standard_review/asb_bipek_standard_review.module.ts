import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsbBipekStandardReviewOrmEntity } from '../../infrastructure/asb_bipek_standard_review/orm/asb_bipek_standard_review.orm_entity';
import { AsbBipekStandardReviewRepository } from '../../domain/asb_bipek_standard_review/asb_bipek_standard_review.repository';
import { AsbBipekStandardReviewRepositoryImpl } from '../../infrastructure/asb_bipek_standard_review/repositories/asb_bipek_standard_review.repository.impl';
import { AsbBipekStandardReviewService } from '../../domain/asb_bipek_standard_review/asb_bipek_standard_review.service';
import { AsbBipekStandardReviewServiceImpl } from '../../application/asb_bipek_standard_review/asb_bipek_standard_review.service.impl';
import { AsbBipekStandardModule } from '../asb_bipek_standard/asb_bipek_standard.module';
import { AsbKomponenBangunanStdModule } from '../asb_komponen_bangunan/asb_komponen_bangunan_std.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([AsbBipekStandardReviewOrmEntity]),
        AsbBipekStandardModule,
        AsbKomponenBangunanStdModule,
    ],
    providers: [
        {
            provide: AsbBipekStandardReviewRepository,
            useClass: AsbBipekStandardReviewRepositoryImpl,
        },
        {
            provide: AsbBipekStandardReviewService,
            useClass: AsbBipekStandardReviewServiceImpl,
        },
    ],
    exports: [AsbBipekStandardReviewService],
})
export class AsbBipekStandardReviewModule { }
