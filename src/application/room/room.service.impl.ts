import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { RoomService } from '../../domain/room/room.service';
import { RoomRepository } from '../../domain/room/room.repository';
import { Room } from '../../domain/room/room.entity';
import { RoomTahunAnggaran } from '../../domain/room/room_tahun_anggaran.entity';
import { CreateRoomDto } from '../../presentation/room/dto/create_room.dto';
import { UpdateRoomDto } from '../../presentation/room/dto/update_room.dto';
import { GetRoomsDto } from '../../presentation/room/dto/get_rooms.dto';

@Injectable()
export class RoomServiceImpl extends RoomService {
    constructor(private readonly roomRepository: RoomRepository) {
        super();
    }

    async findAll(dto: GetRoomsDto): Promise<{ data: Room[]; total: number }> {
        try {
            return await this.roomRepository.findAll(dto);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<Room | null> {
        try {
            return await this.roomRepository.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async findByKode(kode: string): Promise<Room | null> {
        try {
            return await this.roomRepository.findByKode(kode);
        } catch (error) {
            throw error;
        }
    }

    async findByKabkotaId(kabkotaId: number): Promise<Room | null> {
        try {
            return await this.roomRepository.findByKabkotaId(kabkotaId);
        } catch (error) {
            throw error;
        }
    }

    async create(dto: CreateRoomDto): Promise<Room> {
        try {
            // Check kode_room uniqueness
            const existingByKode = await this.roomRepository.findByKode(dto.kode_room);
            if (existingByKode) {
                throw new ConflictException(`Room with kode_room ${dto.kode_room} already exists`);
            }

            // Check kabkota_id uniqueness if provided
            if (dto.kabkota_id !== undefined && dto.kabkota_id !== null) {
                const existingByKabkota = await this.roomRepository.findByKabkotaId(dto.kabkota_id);
                if (existingByKabkota) {
                    throw new ConflictException(`A room with kabkota_id ${dto.kabkota_id} already exists`);
                }
            }

            return await this.roomRepository.create(dto);
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, dto: UpdateRoomDto): Promise<Room> {
        try {
            const existing = await this.roomRepository.findById(id);
            if (!existing) {
                throw new NotFoundException(`Room with id ${id} not found`);
            }

            // Check kode_room uniqueness if changing
            if (dto.kode_room && dto.kode_room !== existing.kode_room) {
                const duplicate = await this.roomRepository.findByKode(dto.kode_room);
                if (duplicate) {
                    throw new ConflictException(`Room with kode_room ${dto.kode_room} already exists`);
                }
            }

            return await this.roomRepository.update(id, dto);
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const existing = await this.roomRepository.findById(id);
            if (!existing) {
                throw new NotFoundException(`Room with id ${id} not found`);
            }
            return await this.roomRepository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    async activate(id: number, isActive: boolean): Promise<Room> {
        try {
            const existing = await this.roomRepository.findById(id);
            if (!existing) {
                throw new NotFoundException(`Room with id ${id} not found`);
            }
            return await this.roomRepository.activate(id, isActive);
        } catch (error) {
            throw error;
        }
    }

    async addTahunAnggaran(roomId: number, tahun: number): Promise<RoomTahunAnggaran> {
        try {
            const existing = await this.roomRepository.findById(roomId);
            if (!existing) {
                throw new NotFoundException(`Room with id ${roomId} not found`);
            }

            const tahunAnggarans = await this.roomRepository.getTahunAnggarans(roomId);
            const duplicate = tahunAnggarans.find((ta) => ta.tahun === tahun);
            if (duplicate) {
                throw new ConflictException(`Tahun anggaran ${tahun} already exists for room ${roomId}`);
            }

            return await this.roomRepository.addTahunAnggaran(roomId, tahun);
        } catch (error) {
            throw error;
        }
    }

    async removeTahunAnggaran(roomId: number, tahun: number): Promise<boolean> {
        try {
            const existing = await this.roomRepository.findById(roomId);
            if (!existing) {
                throw new NotFoundException(`Room with id ${roomId} not found`);
            }

            const tahunAnggarans = await this.roomRepository.getTahunAnggarans(roomId);
            const found = tahunAnggarans.find((ta) => ta.tahun === tahun);
            if (!found) {
                throw new NotFoundException(`Tahun anggaran ${tahun} not found for room ${roomId}`);
            }

            return await this.roomRepository.removeTahunAnggaran(roomId, tahun);
        } catch (error) {
            throw error;
        }
    }

    async getTahunAnggarans(roomId: number): Promise<RoomTahunAnggaran[]> {
        try {
            const existing = await this.roomRepository.findById(roomId);
            if (!existing) {
                throw new NotFoundException(`Room with id ${roomId} not found`);
            }
            return await this.roomRepository.getTahunAnggarans(roomId);
        } catch (error) {
            throw error;
        }
    }

    async assignKabkota(roomId: number, kabkotaId: number | null): Promise<Room> {
        try {
            const existing = await this.roomRepository.findById(roomId);
            if (!existing) {
                throw new NotFoundException(`Room with id ${roomId} not found`);
            }

            // If kabkotaId is non-null, enforce 1-1 uniqueness
            if (kabkotaId !== null && kabkotaId !== undefined) {
                const otherRoom = await this.roomRepository.findByKabkotaId(kabkotaId);
                if (otherRoom && otherRoom.id !== roomId) {
                    throw new ConflictException(`KabKota with id ${kabkotaId} is already linked to another room`);
                }
            }

            return await this.roomRepository.assignKabkota(roomId, kabkotaId);
        } catch (error) {
            throw error;
        }
    }
}
