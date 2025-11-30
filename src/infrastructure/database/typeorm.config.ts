import { DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const typeOrmConfig = (config: ConfigService): DataSourceOptions => ({
    type: 'postgres',
    url: config.get('db.url'),
    entities: [__dirname + '/../infrastructure/**/orm/*.orm_entity{.ts,.js}'],
    synchronize: false,
    migrationsRun: true,
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
});
