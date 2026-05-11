import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('room_tahun_anggarans')
export class RoomTahunAnggaranOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'room_id', type: 'integer' })
    room_id: number;

    @Column({ type: 'integer' })
    tahun: number;

    @Column({ name: 'is_active', type: 'boolean', default: true })
    is_active: boolean;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;
}
