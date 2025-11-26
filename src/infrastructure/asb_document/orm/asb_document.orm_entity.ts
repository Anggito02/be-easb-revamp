import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';
import { DocumentSpec } from '../../../domain/asb_document/document_spec.enum';

@Entity('asb_document')
export class AsbDocumentOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    filename: string;

    @Column({
        type: 'enum',
        enum: DocumentSpec,
    })
    spec: DocumentSpec;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
    deletedAt: Date | null;
}
