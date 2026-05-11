import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Unique } from 'typeorm';

@Entity('room_tahun_anggarans')
@Unique(['room_id', 'tahun'])
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
