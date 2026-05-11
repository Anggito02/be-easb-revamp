import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomController } from './room.controller';
import { RoomServiceImpl } from '../../application/room/room.service.impl';
import { RoomRepositoryImpl } from '../../infrastructure/room/repositories/room.repository.impl';
import { RoomOrmEntity } from '../../infrastructure/room/orm/room.orm_entity';
import { RoomTahunAnggaranOrmEntity } from '../../infrastructure/room/orm/room_tahun_anggaran.orm_entity';
import { RoomService } from '../../domain/room/room.service';
import { RoomRepository } from '../../domain/room/room.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([RoomOrmEntity, RoomTahunAnggaranOrmEntity]),
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
    ],
    exports: [
        RoomService,
        RoomRepository,
    ],
})
export class RoomModule {}
