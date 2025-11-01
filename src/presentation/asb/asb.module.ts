import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsbController } from '../../presentation/asb/asb.controller';
import { AsbService } from 'src/domain/asb/asb.service';
import { AsbOrmEntity } from 'src/infrastructure/asb/orm/asb.orm_entity';
import { AsbRepositoryImpl } from '../../infrastructure/asb/repositories/asb.repository.impl';
import { AsbRepository } from '../../domain/asb/asb.repository';
import { AsbServiceImpl } from 'src/application/asb/asb.service.impl';

@Module({
  imports: [TypeOrmModule.forFeature([AsbOrmEntity])],
  controllers: [AsbController],
  providers: [
    AsbServiceImpl,
    {
        provide: AsbService,
        useExisting: AsbServiceImpl,
    },
    AsbRepositoryImpl,
    {
      provide: AsbRepository,
      useExisting: AsbRepositoryImpl,
    },
  ],
  exports: [AsbService],
})
export class AsbModule {}
