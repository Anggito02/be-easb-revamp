import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsbController } from '../../presentation/asb/asb.controller';
import { AsbService } from './asb.service';
import { AsbOrmEntity } from '../../infrastructure/asb/orm/asb.orm-entity';
import { AsbRepositoryImpl } from '../../infrastructure/asb/repositories/asb.repository.impl';
import { AsbRepository } from '../../domain/asb/asb.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AsbOrmEntity])],
  controllers: [AsbController],
  providers: [
    AsbService,
    AsbRepositoryImpl,
    {
      provide: AsbRepository,
      useExisting: AsbRepositoryImpl,
    },
  ],
  exports: [AsbService],
})
export class AsbModule {}
