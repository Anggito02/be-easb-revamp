import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('rooms')
export class RoomOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'kode_room', type: 'varchar', length: 255, unique: true })
    kode_room: string;

    @Column({ type: 'varchar', length: 500 })
    nama: string;

    @Column({ name: 'kabkota_id', type: 'integer', nullable: true, unique: true })
    kabkota_id: number | null;

    @Column({ name: 'contract_start', type: 'date', nullable: true })
    contract_start: Date | null;

    @Column({ name: 'contract_end', type: 'date', nullable: true })
    contract_end: Date | null;

    @Column({ name: 'is_active', type: 'boolean', default: false })
    is_active: boolean;

    @Column({ name: 'created_by_user_id', type: 'integer', nullable: true })
    created_by_user_id: number | null;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
    deletedAt?: Date;
}
