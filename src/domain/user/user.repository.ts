import { User } from './user.entity';

export abstract class UserRepository {
    abstract findByUsername(username: string): Promise<User | null>;
    abstract findById(id: number): Promise<User | null>;
    abstract create(user: User): Promise<User>;
}
