import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsbBipekNonStdReviewOrmEntity } from '../../infrastructure/asb_bipek_non_std_review/orm/asb_bipek_non_std_review.orm_entity';
import { AsbBipekNonStdReviewRepository } from '../../domain/asb_bipek_non_std_review/asb_bipek_non_std_review.repository';
import { AsbBipekNonStdReviewRepositoryImpl } from '../../infrastructure/asb_bipek_non_std_review/repositories/asb_bipek_non_std_review.repository.impl';
import { AsbBipekNonStdReviewService } from '../../domain/asb_bipek_non_std_review/asb_bipek_non_std_review.service';
import { AsbBipekNonStdReviewServiceImpl } from '../../application/asb_bipek_non_std_review/asb_bipek_non_std_review.service.impl';
import { AsbBipekNonStdModule } from '../asb_bipek_non_std/asb_bipek_non_std.module';
import { AsbKomponenBangunanModule } from '../asb_komponen_bangunan/asb_komponen_bangunan_std.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([AsbBipekNonStdReviewOrmEntity]),
        AsbBipekNonStdModule,
        AsbKomponenBangunanModule,
    ],
    providers: [
        {
            provide: AsbBipekNonStdReviewRepository,
            useClass: AsbBipekNonStdReviewRepositoryImpl,
        },
        {
            provide: AsbBipekNonStdReviewService,
            useClass: AsbBipekNonStdReviewServiceImpl,
        },
    ],
    exports: [AsbBipekNonStdReviewService],
})
export class AsbBipekNonStdReviewModule { }
