import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from '../../../domain/user/user.repository';
import { User } from '../../../domain/user/user.entity';
import { UserOrmEntity } from '../orm/user.orm_entity';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
    constructor(
        @InjectRepository(UserOrmEntity)
        private readonly repo: Repository<UserOrmEntity>,
    ) {}

    async findByUsername(username: string): Promise<User | null> {
        const entity = await this.repo.findOne({ where: { username } });
        return entity ? (entity as unknown as User) : null;
    }

    async findById(id: number): Promise<User | null> {
        const entity = await this.repo.findOne({ where: { id } });
        return entity ? (entity as unknown as User) : null;
    }

    async create(user: User): Promise<User> {
        const entity = this.repo.create(user as any);
        const saved = await this.repo.save(entity);
        return saved as unknown as User;
    }
}
