import { DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { UserOrmEntity } from '../user/orm/user.orm_entity';
import { ProvinceOrmEntity } from '../provinces/orm/province.orm_entity';

export const typeOrmConfig = (config: ConfigService): DataSourceOptions => {
    const url = config.get<string | undefined>('db.url');

  if (url) {
    // ✅ PRODUCTION: use connection string only
    return {
      type: 'postgres',
      url,
      entities: [UserOrmEntity, ProvinceOrmEntity],
      synchronize: false,
      migrationsRun: true,
      migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    };
  }

  // ✅ DEVELOPMENT: use discrete host/port/etc
  return {
    type: 'postgres',
    host: config.get<string>('db.host'),
    port: config.get<number>('db.port'),
    username: config.get<string>('db.username'),
    password: config.get<string>('db.password'),
    database: config.get<string>('db.name'),
    entities: [UserOrmEntity, ProvinceOrmEntity],
    synchronize: false,
    migrationsRun: true,
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  };
};
