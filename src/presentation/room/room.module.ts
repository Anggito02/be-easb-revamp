import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomController } from './room.controller';
import { RoomServiceImpl } from '../../application/room/room.service.impl';
import { RoomRepositoryImpl } from '../../infrastructure/room/repositories/room.repository.impl';
import { RoomOrmEntity } from '../../infrastructure/room/orm/room.orm_entity';
import { FiscalYearOrmEntity } from '../../infrastructure/fiscal_year/orm/fiscal_year.orm_entity';
import { RoomService } from '../../domain/room/room.service';
import { RoomRepository } from '../../domain/room/room.repository';
import { RoomDinasService } from '../../application/room/room_dinas.service';
import { UserOrmEntity } from '../../infrastructure/user/orm/user.orm_entity';
import { OpdOrmEntity } from '../../infrastructure/opd/orm/opd.orm_entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([RoomOrmEntity, FiscalYearOrmEntity, UserOrmEntity, OpdOrmEntity]),
    ],
    controllers: [RoomController],
    providers: [
        {
            provide: RoomService,
            useClass: RoomServiceImpl,
        },
        {
            provide: RoomRepository,
            useClass: RoomRepositoryImpl,
        },
        RoomDinasService,
    ],
    exports: [
        RoomService,
        RoomRepository,
        RoomDinasService,
    ],
})
export class RoomModule {}
