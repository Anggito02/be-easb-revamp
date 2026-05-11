import { Room } from 'src/domain/room/room.entity';

export class RoomsPaginationResultDto {
    data!: Room[];
    total!: number;
}
