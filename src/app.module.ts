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

import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseCaptureInterceptor } from './common/interceptors/response_capture.interceptors';
import { DataSourceOptions } from 'typeorm';

// import module lain sesuai kebutuhan

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
            validationSchema,
        }),
        TypeOrmModule.forRootAsync({
            useFactory: (config: ConfigService): DataSourceOptions => {
                const url = config.get<string | undefined>('db.url');

                // If DB_URL is set (production) → use connection string
                if (url) {
                return {
                    type: 'postgres',
                    url,
                    entities: [__dirname + '/infrastructure/**/orm/*.orm_entity{.js,.ts}'],
                    synchronize: false,
                    migrationsRun: false,
                    migrations: [__dirname + '/migrations/*{.js,.ts}'],
                };
                }

                // Otherwise (development) → use host/port/etc
                return {
                type: 'postgres',
                host: config.get<string>('db.host'),
                port: config.get<number>('db.port'),
                username: config.get<string>('db.username'),
                password: config.get<string>('db.password'),
                database: config.get<string>('db.name'),
                entities: [__dirname + '/infrastructure/**/orm/*.orm_entity{.js,.ts}'],
                synchronize: false,
                migrationsRun: false,
                migrations: [__dirname + '/migrations/*{.js,.ts}'],
                };
            },
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
        ShstModule
        // other modules...
    ],
    providers: [
        { provide: APP_INTERCEPTOR, useClass: ResponseCaptureInterceptor },
    ],
})
export class AppModule {}
