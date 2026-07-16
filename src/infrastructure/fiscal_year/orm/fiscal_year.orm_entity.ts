import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Unique } from 'typeorm';

@Entity('fiscal_years')
@Unique(['kabkota_id', 'tahun'])
export class FiscalYearOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'kabkota_id', type: 'integer' })
    kabkota_id: number;

    @Column({ type: 'integer' })
    tahun: number;

    @Column({ name: 'is_active', type: 'boolean', default: true })
    is_active: boolean;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;
}
