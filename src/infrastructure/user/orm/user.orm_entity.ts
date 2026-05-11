import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Role } from 'src/domain/user/user_role.enum';

@Entity({ name: 'users' })
export class UserOrmEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ unique: true, length: 50 })
  username!: string;

  @Column({ name: 'password_hash', length: 255 })
  passwordHash!: string;
  
  @Column('text', { array: true, default: () => "'{}'" })
  roles!: Role[];

  @Column({ type: 'varchar', length: 255, nullable: true, unique: true })
  email!: string | null;

  @Column({ name: 'room_id', type: 'integer', nullable: true })
  room_id!: number | null;

  @Column({ name: 'refresh_token_version', type: 'int', default: 0 })
  refreshTokenVersion!: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt!: Date | null;
}