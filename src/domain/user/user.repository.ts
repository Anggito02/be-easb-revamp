import { User } from './user.entity';

export interface UserRepository {
    findByUsername(username: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    create(user: User): Promise<User>;
    update(user: User): Promise<User>;
}
