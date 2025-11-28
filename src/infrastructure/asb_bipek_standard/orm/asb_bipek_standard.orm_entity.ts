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
import { CalculationMethod } from '../../../domain/asb_bipek_standard/calculation_method.enum';
import { AsbKomponenBangunanOrmEntity } from '../../asb_komponen_bangunan/orm/asb_komponen_bangunan.orm_entity';

@Entity('asb_bipek_standard')
export class AsbBipekStandardOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 10,
        default: 'ORIGIN',
    })
    files: Files;

    @Column({
        name: 'id_asb_komponen_bangunan',
        type: 'int',
        nullable: true,
    })
    idAsbKomponenBangunan: number | null;

    @Column({ name: 'bobot_input', type: 'float', nullable: true })
    bobotInput: number | null;

    @Column({
        name: 'bobot_input_prosentase',
        type: 'float',
        nullable: true,
    })
    bobotInputProsentase: number | null;

    @Column({
        name: 'calculation_method',
        type: 'varchar',
        length: 20,
        nullable: true,
    })
    calculationMethod: CalculationMethod | null;

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

    @ManyToOne(() => AsbKomponenBangunanOrmEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_asb_komponen_bangunan' })
    asbKomponenBangunan: AsbKomponenBangunanOrmEntity;
}
