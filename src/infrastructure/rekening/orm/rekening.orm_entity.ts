import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('rekenings')
export class RekeningOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'rekening_kode', type: 'varchar', length: 255 })
    rekening_kode: string;

    @Column({ name: 'room_id', type: 'integer', nullable: true })
    room_id!: number | null;

    @Column({ name: 'rekening_uraian', type: 'varchar', length: 500 })
    rekening_uraian: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
    deletedAt?: Date;
}
