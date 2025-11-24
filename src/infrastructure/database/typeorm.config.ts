import { DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { UserOrmEntity } from '../user/orm/user.orm_entity';
import { ProvinceOrmEntity } from '../provinces/orm/province.orm_entity';

export const typeOrmConfig = (config: ConfigService): DataSourceOptions => ({
    type: 'postgres',
    host: config.get<string | undefined>('db.host'),
    port: config.get<number | undefined>('db.port'),
    username: config.get<string | undefined>('db.username'),
    password: config.get<string | undefined>('db.password'),
    database: config.get<string | undefined>('db.name'),
    url: config.get<string | undefined>('db.url'),
    entities: [UserOrmEntity, ProvinceOrmEntity],
    synchronize: false,
    migrationsRun: true,
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
});
