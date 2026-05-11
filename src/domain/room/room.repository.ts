import { Room } from './room.entity';
import { RoomTahunAnggaran } from './room_tahun_anggaran.entity';
import { CreateRoomDto } from 'src/presentation/room/dto/create_room.dto';
import { UpdateRoomDto } from 'src/presentation/room/dto/update_room.dto';
import { GetRoomsDto } from 'src/presentation/room/dto/get_rooms.dto';

export abstract class RoomRepository {
    abstract findAll(dto: GetRoomsDto): Promise<{ data: Room[]; total: number }>;
    abstract findById(id: number): Promise<Room | null>;
    abstract findByKode(kode: string): Promise<Room | null>;
    abstract findByKabkotaId(kabkotaId: number): Promise<Room | null>;
    abstract create(dto: CreateRoomDto): Promise<Room>;
    abstract update(id: number, dto: UpdateRoomDto): Promise<Room>;
    abstract delete(id: number): Promise<boolean>;
    abstract activate(id: number, isActive: boolean): Promise<Room>;
    abstract addTahunAnggaran(roomId: number, tahun: number): Promise<RoomTahunAnggaran>;
    abstract removeTahunAnggaran(roomId: number, tahun: number): Promise<boolean>;
    abstract getTahunAnggarans(roomId: number): Promise<RoomTahunAnggaran[]>;
    abstract assignKabkota(roomId: number, kabkotaId: number | null): Promise<Room>;
}
