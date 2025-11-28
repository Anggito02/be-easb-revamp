import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validationSchema } from './config/validation';
import configuration from './config/configuration';

import { AuthModule } from './presentation/auth/auth.module';
import { UserModule } from './presentation/users/user.module';
import { ProvinceModule } from './presentation/provinces/province.module';
import { KabKotaModule } from './presentation/kabkota/kabkota.module';
import { SatuanModule } from './presentation/satuan/satuan.module';
import { AsbFungsiRuangModule } from './presentation/asb_fungsi_ruang/asb_fungsi_ruang.module';
import { AsbJenisModule } from './presentation/asb_jenis/asb_jenis.module';
import { AsbLantaiModule } from './presentation/asb_lantai/asb_lantai.module';
import { AsbStatusModule } from './presentation/asb_status/asb_status.module';
import { RekeningModule } from './presentation/rekening/rekening.module';
import { JenisStandarModule } from './presentation/jenis_standar/jenis_standar.module';
import { AsbTipeBangunanModule } from './presentation/asb_tipe_bangunan/asb_tipe_bangunan.module';
import { AsbKlasifikasiModule } from './presentation/asb_klasifikasi/asb_klasifikasi.module';
import { ShstModule } from './presentation/shst/shst.module';
import { AsbKomponenBangunanModule } from './presentation/asb_komponen_bangunan/asb_komponen_bangunan.module';
import { AsbKomponenBangunanNonstdModule } from './presentation/asb_komponen_bangunan_nonstd/asb_komponen_bangunan_nonstd.module';
import { AsbKomponenBangunanProsModule } from './presentation/asb_komponen_bangunan_pros/asb_komponen_bangunan_pros.module';
import { AsbJakonModule } from './presentation/asb_jakon/asb_jakon.module';
import { AsbBpsGalleryModule } from './presentation/asb_bps_gallery/asb_bps_gallery.module';
import { AsbDocumentModule } from './presentation/asb_document/asb_document.module';
import { AsbLogModule } from './presentation/asb_log/asb_log.module';
import { AsbDetailModule } from './presentation/asb_detail/asb_detail.module';
import { AsbBipekStandardModule } from './presentation/asb_bipek_standard/asb_bipek_standard.module';
import { AsbBipekNonStdModule } from './presentation/asb_bipek_non_std/asb_bipek_non_std.module';
import { AsbDetailReviewModule } from './presentation/asb_detail_review/asb_detail_review.module';
import { AsbBipekStandardReviewModule } from './presentation/asb_bipek_standard_review/asb_bipek_standard_review.module';
import { AsbBipekNonStdReviewModule } from './presentation/asb_bipek_non_std_review/asb_bipek_non_std_review.module';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseCaptureInterceptor } from './common/interceptors/response_capture.interceptors';

// import module lain sesuai kebutuhan

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
            validationSchema,
        }),
        TypeOrmModule.forRootAsync({
            useFactory: (config: ConfigService) => ({
                type: 'postgres',
                host: config.get('db.host'),
                port: config.get<number>('db.port'),
                username: config.get('db.username'),
                password: config.get('db.password'),
                database: config.get('db.name'),
                entities: [__dirname + '/infrastructure/**/orm/*.orm_entity{.ts,.js}'],
                synchronize: false, // always false in production
                migrationsRun: false,
                migrations: [__dirname + '/migrations/*{.ts,.js}'],
            }),
            inject: [ConfigService],
        }),
        AuthModule,
        UserModule,
        ProvinceModule,
        KabKotaModule,
        SatuanModule,
        AsbFungsiRuangModule,
        AsbJenisModule,
        AsbLantaiModule,
        RekeningModule,
        AsbStatusModule,
        JenisStandarModule,
        AsbTipeBangunanModule,
        AsbKlasifikasiModule,
        ShstModule,
        AsbKomponenBangunanModule,
        AsbKomponenBangunanNonstdModule,
        AsbKomponenBangunanProsModule,
        AsbJakonModule,
        AsbBpsGalleryModule,
        AsbDocumentModule,
        AsbLogModule,
        AsbDetailModule,
        AsbBipekStandardModule,
        AsbBipekNonStdModule,
        AsbDetailReviewModule,
        AsbBipekStandardReviewModule,
        AsbBipekNonStdReviewModule
        // other modules...
    ],
    providers: [
        { provide: APP_INTERCEPTOR, useClass: ResponseCaptureInterceptor },
    ],
})
export class AppModule { }
