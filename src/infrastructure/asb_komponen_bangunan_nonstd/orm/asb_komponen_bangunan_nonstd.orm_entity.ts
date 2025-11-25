import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('asb_komponen_bangunan_nonstd')
export class AsbKomponenBangunanNonstdOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    komponen!: string;

    @Column({ name: 'bobot_min', type: 'double precision' })
    bobotMin!: number;

    @Column({ type: 'double precision' })
    bobot!: number;

    @Column({ name: 'bobot_max', type: 'double precision' })
    bobotMax!: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
    deletedAt?: Date;
}
