import { User } from "./user.entity";

export abstract class UserService {
    abstract create(user: User): Promise<User>
    abstract validateUser(user: string, password: string): Promise<User | null>
    abstract findByUsername(username: string): Promise<User | null>
}