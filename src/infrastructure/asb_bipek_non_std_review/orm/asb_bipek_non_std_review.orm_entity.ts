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
import { Files } from '../../../domain/asb_detail/files.enum';
import { AsbBipekNonStdOrmEntity } from '../../asb_bipek_non_std/orm/asb_bipek_non_std.orm_entity';
import { AsbKomponenBangunanOrmEntity } from '../../asb_komponen_bangunan/orm/asb_komponen_bangunan.orm_entity';
import { AsbOrmEntity } from 'src/infrastructure/asb/orm/asb.orm_entity';

@Entity('asb_bipek_non_std_reviews')
export class AsbBipekNonStdReviewOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'id_asb_bipek_non_std', type: 'int' })
    idAsbBipekNonStd: number;

    @Column({
        name: 'id_asb_komponen_bangunan',
        type: 'int',
        nullable: true,
    })
    idAsbKomponenBangunan: number | null;

    @Column({ name: 'id_asb', type: 'int', nullable: true })
    idAsb: number | null;

    @Column({
        type: 'varchar',
        length: 10,
        default: 'ORIGIN',
    })
    files: Files;

    @Column({ name: 'bobot_input', type: 'float', nullable: true })
    bobotInput: number | null;

    @Column({ name: 'jumlah_bobot', type: 'float', nullable: true })
    jumlahBobot: number | null;

    @Column({ name: 'rincian_harga', type: 'float', nullable: true })
    rincianHarga: number | null;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({
        name: 'deleted_at',
        type: 'timestamptz',
        nullable: true,
    })
    deletedAt: Date | null;

    @ManyToOne(() => AsbBipekNonStdOrmEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_asb_bipek_non_std' })
    asbBipekNonStd: AsbBipekNonStdOrmEntity;

    @ManyToOne(() => AsbKomponenBangunanOrmEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_asb_komponen_bangunan' })
    asbKomponenBangunan: AsbKomponenBangunanOrmEntity;

    @ManyToOne(() => AsbOrmEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_asb' })
    asb: AsbOrmEntity;
}
