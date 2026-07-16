import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { UserOrmEntity } from '../../infrastructure/user/orm/user.orm_entity';
import { OpdOrmEntity } from '../../infrastructure/opd/orm/opd.orm_entity';
import { RoomOrmEntity } from '../../infrastructure/room/orm/room.orm_entity';
import { Role } from '../../domain/user/user_role.enum';
import { CreateDinasDto } from '../../presentation/room/dto/create_dinas.dto';
import { BulkDinasDto } from '../../presentation/room/dto/bulk_dinas.dto';
import { CreateAdminAccountDto } from '../../presentation/room/dto/create_admin_account.dto';

export interface DinasWithUser {
    id: number;
    opd: string;
    alias: string;
    id_user: number;
    room_id: number;
    email: string | null;
    createdAt: Date;
}

export interface AdminAccount {
    id: number;
    username: string;
    email: string | null;
    room_id: number | null;
    createdAt: Date;
}

export interface AssignableOpdUser {
    id: number;
    username: string;
}

@Injectable()
export class RoomDinasService {
    constructor(
        @InjectRepository(UserOrmEntity) private readonly userRepo: Repository<UserOrmEntity>,
        @InjectRepository(OpdOrmEntity) private readonly opdRepo: Repository<OpdOrmEntity>,
        @InjectRepository(RoomOrmEntity) private readonly roomRepo: Repository<RoomOrmEntity>,
    ) {}

    async listDinas(roomId: number): Promise<DinasWithUser[]> {
        const opds = await this.opdRepo.find({
            where: { room_id: roomId },
            order: { id: 'DESC' },
        });

        const result: DinasWithUser[] = [];
        for (const opd of opds) {
            const user = await this.userRepo.findOne({ where: { id: opd.id_user } });
            result.push({
                id: opd.id,
                opd: opd.opd,
                alias: opd.alias,
                id_user: opd.id_user,
                room_id: opd.room_id!,
                email: user?.email ?? null,
                createdAt: opd.createdAt,
            });
        }
        return result;
    }

    async createDinas(roomId: number, dto: CreateDinasDto): Promise<DinasWithUser> {
        // Validate room exists
        const room = await this.roomRepo.findOne({ where: { id: roomId } });
        if (!room) throw new NotFoundException(`Room with id ${roomId} not found`);

        // Check email uniqueness globally
        const existingUser = await this.userRepo.findOne({ where: { email: dto.email } });
        if (existingUser) throw new ConflictException(`Email ${dto.email} is already in use`);

        // Check opd name uniqueness globally (db-level constraint)
        const existingOpd = await this.opdRepo.findOne({ where: { opd: dto.nama } });
        if (existingOpd) throw new ConflictException(`Dinas "${dto.nama}" already exists`);

        // Create user with OPD role
        const passwordHash = await bcrypt.hash(dto.password, 10);
        // Generate username from alias + room code
        const username = `${dto.alias.toLowerCase().replace(/\s+/g, '_')}_${room.kode_room}`.slice(0, 50);

        // Check username uniqueness
        const existingUsername = await this.userRepo.findOne({ where: { username } });
        if (existingUsername) throw new ConflictException(`Username "${username}" is already taken`);

        const user = await this.userRepo.save({
            username,
            passwordHash,
            email: dto.email,
            roles: [Role.OPD],
            refreshTokenVersion: 0,
            room_id: roomId,
            is_active: true,
        });

        // Create OPD
        const opd = await this.opdRepo.save({
            opd: dto.nama,
            alias: dto.alias,
            id_user: user.id,
            room_id: roomId,
        });

        return {
            id: opd.id,
            opd: opd.opd,
            alias: opd.alias,
            id_user: user.id,
            room_id: roomId,
            email: user.email,
            createdAt: opd.createdAt,
        };
    }

    async bulkCreateDinas(roomId: number, dto: BulkDinasDto): Promise<{ created: number; errors: string[] }> {
        const lines = dto.raw_text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        let created = 0;
        const errors: string[] = [];

        for (const line of lines) {
            const parts = line.split(',').map(p => p.trim());
            if (parts.length < 4) {
                errors.push(`Line "${line}": expected format "Nama,Alias,Email,Password"`);
                continue;
            }
            const [nama, alias, email, password] = parts;
            try {
                await this.createDinas(roomId, { nama, alias, email, password });
                created++;
            } catch (err: any) {
                errors.push(`"${nama}": ${err.message}`);
            }
        }

        return { created, errors };
    }

    async listAssignableOpdUsers(roomId: number): Promise<AssignableOpdUser[]> {
        const users = await this.userRepo
            .createQueryBuilder('user')
            .where(`'opd' = ANY(user.roles)`)
            .andWhere('user.room_id = :roomId', { roomId })
            .andWhere('user.is_active = :active', { active: true })
            .andWhere('user.deleted_at IS NULL')
            .orderBy('user.username', 'ASC')
            .getMany();

        return users.map(u => ({ id: u.id, username: u.username }));
    }

    async assignDinasUser(roomId: number, opdId: number, userId: number): Promise<DinasWithUser> {
        const opd = await this.opdRepo.findOne({ where: { id: opdId, room_id: roomId } });
        if (!opd) {
            throw new NotFoundException(`Dinas with id ${opdId} not found in room ${roomId}`);
        }

        const user = await this.userRepo.findOne({ where: { id: userId, room_id: roomId } });
        if (!user || user.deletedAt) {
            throw new NotFoundException(`User with id ${userId} not found in room ${roomId}`);
        }
        if (!user.roles.includes(Role.OPD)) {
            throw new BadRequestException('User must have the OPD role');
        }
        if (user.is_active === false) {
            throw new BadRequestException('Cannot assign an inactive user');
        }

        const duplicate = await this.opdRepo
            .createQueryBuilder('o')
            .where('o.room_id = :roomId', { roomId })
            .andWhere('o.id_user = :userId', { userId })
            .andWhere('o.id != :opdId', { opdId })
            .andWhere('o.deleted_at IS NULL')
            .getOne();
        if (duplicate) {
            throw new ConflictException('This OPD user is already linked to another dinas in this room');
        }

        opd.id_user = userId;
        await this.opdRepo.save(opd);

        return {
            id: opd.id,
            opd: opd.opd,
            alias: opd.alias,
            id_user: opd.id_user,
            room_id: roomId,
            email: user.email ?? null,
            createdAt: opd.createdAt,
        };
    }

    async deleteDinas(roomId: number, opdId: number): Promise<boolean> {
        const opd = await this.opdRepo.findOne({ where: { id: opdId, room_id: roomId } });
        if (!opd) throw new NotFoundException(`Dinas with id ${opdId} not found in room ${roomId}`);

        // Soft-delete OPD
        await this.opdRepo.softDelete(opdId);
        // Soft-delete linked user
        await this.userRepo.softDelete(opd.id_user);

        return true;
    }

    async listAdmins(roomId: number): Promise<AdminAccount[]> {
        const users = await this.userRepo
            .createQueryBuilder('user')
            .where(`'admin' = ANY(user.roles)`)
            .andWhere('user.room_id = :roomId', { roomId })
            .andWhere('user.deleted_at IS NULL')
            .orderBy('user.id', 'DESC')
            .getMany();

        return users.map(u => ({
            id: u.id,
            username: u.username,
            email: u.email ?? null,
            room_id: u.room_id,
            createdAt: u.createdAt,
        }));
    }

    async createAdmin(roomId: number, dto: CreateAdminAccountDto): Promise<AdminAccount> {
        if (dto.userId != null) {
            return this.assignExistingAdminToRoom(roomId, dto.userId);
        }

        const room = await this.roomRepo.findOne({ where: { id: roomId } });
        if (!room) throw new NotFoundException(`Room with id ${roomId} not found`);

        if (!dto.username || !dto.email || !dto.password) {
            throw new BadRequestException('username, email, and password are required when userId is omitted');
        }

        // Check username uniqueness
        const existingUsername = await this.userRepo.findOne({ where: { username: dto.username } });
        if (existingUsername) throw new ConflictException(`Username "${dto.username}" is already taken`);

        // Check email uniqueness
        const existingEmail = await this.userRepo.findOne({ where: { email: dto.email } });
        if (existingEmail) throw new ConflictException(`Email ${dto.email} is already in use`);

        const passwordHash = await bcrypt.hash(dto.password, 10);
        const user = await this.userRepo.save({
            username: dto.username,
            passwordHash,
            email: dto.email,
            roles: [Role.ADMIN],
            refreshTokenVersion: 0,
            room_id: roomId,
            is_active: true,
        });

        return {
            id: user.id,
            username: user.username,
            email: user.email ?? null,
            room_id: user.room_id,
            createdAt: user.createdAt,
        };
    }

    /** Attach an existing admin user from Manajemen Akun to this room (sets room_id). */
    private async assignExistingAdminToRoom(roomId: number, userId: number): Promise<AdminAccount> {
        const room = await this.roomRepo.findOne({ where: { id: roomId } });
        if (!room) throw new NotFoundException(`Room with id ${roomId} not found`);

        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) throw new NotFoundException(`User with id ${userId} not found`);
        if (user.deletedAt) throw new NotFoundException(`User with id ${userId} not found`);
        if (!user.roles.includes(Role.ADMIN)) {
            throw new BadRequestException('User must have the Admin role');
        }
        if (user.roles.includes(Role.SUPERADMIN)) {
            throw new BadRequestException('Cannot assign a superadmin as room admin');
        }
        if (user.is_active === false) {
            throw new BadRequestException('Cannot assign an inactive user');
        }
        if (user.room_id != null && user.room_id !== roomId) {
            throw new ConflictException('User is already assigned to another room');
        }

        user.room_id = roomId;
        await this.userRepo.save(user);

        return {
            id: user.id,
            username: user.username,
            email: user.email ?? null,
            room_id: user.room_id,
            createdAt: user.createdAt,
        };
    }

    async deleteAdmin(roomId: number, userId: number): Promise<boolean> {
        const user = await this.userRepo.findOne({ where: { id: userId, room_id: roomId } });
        if (!user) throw new NotFoundException(`Admin user with id ${userId} not found in room ${roomId}`);
        if (!user.roles.includes(Role.ADMIN)) throw new NotFoundException(`User ${userId} is not an Admin`);
        await this.userRepo.softDelete(userId);
        return true;
    }
}
