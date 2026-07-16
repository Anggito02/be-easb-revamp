import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ColumnOptions,
} from 'typeorm';
import { Role } from 'src/domain/user/user_role.enum';

/** Postgres uses native TEXT[]; MySQL stores JSON in varchar (see migrations). */
function userRolesColumn(): ColumnOptions {
  const dbType = process.env.DB_TYPE || 'postgres';
  if (dbType === 'mysql') {
    return { type: 'simple-json', default: '[]' };
  }
  return { type: 'text', array: true, default: '{}' };
}

@Entity({ name: 'users' })
export class UserOrmEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ unique: true, length: 50 })
  username!: string;

  @Column({ name: 'password_hash', length: 255 })
  passwordHash!: string;

  @Column(userRolesColumn())
  roles!: Role[];

  @Column({ type: 'varchar', length: 255, nullable: true, unique: true })
  email!: string | null;

  @Column({ name: 'room_id', type: 'integer', nullable: true })
  room_id!: number | null;

  @Column({ name: 'refresh_token_version', type: 'int', default: 0 })
  refreshTokenVersion!: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  is_active!: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt!: Date | null;
}