import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { AsbKomponenBangunanStdOrmEntity } from '../../asb_komponen_bangunan/orm/asb_komponen_bangunan_std.orm_entity';
import { AsbTipeBangunanOrmEntity } from '../../asb_tipe_bangunan/orm/asb_tipe_bangunan.orm_entity';

@Entity('asb_komponen_bangunan_pros_std')
export class AsbKomponenBangunanProsStdOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'id_asb_komponen_bangunan_std', type: 'integer' })
    idAsbKomponenBangunanStd!: number;

    @Column({ name: 'id_asb_tipe_bangunan', type: 'integer' })
    idAsbTipeBangunan!: number;

    @Column({ type: 'double precision' })
    min!: number;

    @Column({ name: 'avg_min', type: 'double precision', nullable: true })
    avgMin?: number;

    @Column({ type: 'double precision' })
    avg!: number;

    @Column({ name: 'avg_max', type: 'double precision', nullable: true })
    avgMax?: number;

    @Column({ type: 'double precision' })
    max!: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
    deletedAt?: Date;

    @ManyToOne(() => AsbKomponenBangunanStdOrmEntity)
    @JoinColumn({ name: 'id_asb_komponen_bangunan_std' })
    asbKomponenBangunanStd!: AsbKomponenBangunanStdOrmEntity;

    @ManyToOne(() => AsbTipeBangunanOrmEntity)
    @JoinColumn({ name: 'id_asb_tipe_bangunan' })
    asbTipeBangunan!: AsbTipeBangunanOrmEntity;
}
