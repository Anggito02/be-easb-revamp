import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validationSchema } from './config/validation';
import configuration from './config/configuration';

import { AuthModule } from './application/auth/auth.module';
import { AsbModule } from './application/asb/asb.module';
import { UsersModule } from './application/user/user.module';
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
                port: +config.get<number>('db.port'),
                username: config.get('db.username'),
                password: config.get('db.password'),
                database: config.get('db.name'),
                entities: [__dirname + '/infrastructure/**/orm/*.orm-entity{.ts,.js}'],
                synchronize: false, // always false in production
                migrationsRun: true,
                migrations: [__dirname + '/migrations/*{.ts,.js}'],
            }),
            inject: [ConfigService],
        }),
        AuthModule,
        AsbModule,
        UsersModule,
        // other modules...
    ],
})
export class AppModule {}
