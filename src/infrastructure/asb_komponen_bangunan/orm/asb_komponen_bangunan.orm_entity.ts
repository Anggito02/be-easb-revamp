import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { AsbKomponenBangunanFiles } from '../../../domain/asb_komponen_bangunan/asb_komponen_bangunan_files.enum';
import { AsbJenisOrmEntity } from '../../asb_jenis/orm/asb_jenis.orm_entity';

@Entity('asb_komponen_bangunan')
export class AsbKomponenBangunanOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    komponen!: string;

    @Column({ type: 'enum', enum: AsbKomponenBangunanFiles })
    files!: AsbKomponenBangunanFiles;

    @Column({ name: 'id_asb_jenis', type: 'integer' })
    idAsbJenis!: number;

    @ManyToOne(() => AsbJenisOrmEntity)
    @JoinColumn({ name: 'id_asb_jenis' })
    asbJenis?: AsbJenisOrmEntity;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
    deletedAt?: Date;
}
