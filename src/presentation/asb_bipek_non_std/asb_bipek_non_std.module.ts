import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsbBipekNonStdOrmEntity } from '../../infrastructure/asb_bipek_non_std/orm/asb_bipek_non_std.orm_entity';
import { AsbBipekNonStdRepository } from '../../domain/asb_bipek_non_std/asb_bipek_non_std.repository';
import { AsbBipekNonStdRepositoryImpl } from '../../infrastructure/asb_bipek_non_std/repositories/asb_bipek_non_std.repository.impl';
import { AsbBipekNonStdService } from '../../domain/asb_bipek_non_std/asb_bipek_non_std.service';
import { AsbBipekNonStdServiceImpl } from '../../application/asb_bipek_non_std/asb_bipek_non_std.service.impl';
import { AsbKomponenBangunanModule } from '../asb_komponen_bangunan/asb_komponen_bangunan_std.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([AsbBipekNonStdOrmEntity]),
        AsbKomponenBangunanModule,
    ],
    providers: [
        {
            provide: AsbBipekNonStdRepository,
            useClass: AsbBipekNonStdRepositoryImpl,
        },
        {
            provide: AsbBipekNonStdService,
            useClass: AsbBipekNonStdServiceImpl,
        },
    ],
    exports: [AsbBipekNonStdService],
})
export class AsbBipekNonStdModule { }
