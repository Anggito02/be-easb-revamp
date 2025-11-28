import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';
import { AsbKomponenBangunanOrmEntity } from '../../asb_komponen_bangunan/orm/asb_komponen_bangunan.orm_entity';
import { AsbOrmEntity } from '../../asb/orm/asb.orm_entity';

@Entity('asb_bps_gallery')
export class AsbBpsGalleryOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'id_asb_komponen_bangunan', type: 'int', nullable: true })
    idAsbKomponenBangunan: number | null;

    @Column({ name: 'id_asb', type: 'int', nullable: true })
    idAsb: number | null;

    @Column({ type: 'text' })
    filename: string;

    @Column({ name: 'jumlah_bobot', type: 'double precision', nullable: true })
    jumlahBobot: number | null;

    @Column({ name: 'rincian_harga', type: 'double precision', nullable: true })
    rincianHarga: number | null;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
    deletedAt: Date | null;

    @ManyToOne(
        () => AsbKomponenBangunanOrmEntity,
        { onDelete: 'SET NULL', nullable: true },
    )
    @JoinColumn({ name: 'id_asb_komponen_bangunan' })
    komponenBangunan: AsbKomponenBangunanOrmEntity;

    @ManyToOne(() => AsbOrmEntity, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'id_asb' })
    asb: AsbOrmEntity;
}
