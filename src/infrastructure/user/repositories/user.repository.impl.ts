import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { UserRepository } from '../../../domain/user/user.repository';
import { User } from '../../../domain/user/user.entity';
import { UserOrmEntity } from '../orm/user.orm_entity';
import { CreateUserDto } from 'src/presentation/users/dto/create_user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(@InjectRepository(UserOrmEntity) private readonly repo: Repository<UserOrmEntity>) {}

    async create(user: CreateUserDto): Promise<User> {
        try {
            const userOrm = plainToInstance(UserOrmEntity, user);
            userOrm.passwordHash = user.password;
            console.log("UserORM: ", userOrm);

            const newUser = await this.repo.save(userOrm);
            return newUser;
        } catch (error) {
            throw error;
        }
    }

    async findByUsername(username: string): Promise<User | null> {
        try {
            const u = await this.repo.findOne({ where: { username } });
            if (!u) {
                return null;
            }

            return u;
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<User | null> { 
        try {
            const u = await this.repo.findOne({ where: { id } });

            if (!u) {
                return null;
            }

            return u;
        } catch (error) {
            throw error;
        }
    }
}
