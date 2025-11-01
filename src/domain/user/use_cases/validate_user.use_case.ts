import { UserRepository } from '../user.repository';
import { User } from '../user.entity';
import * as bcrypt from 'bcryptjs';

export class ValidateUserUseCase {
    constructor(private readonly userRepo: UserRepository) {}

    async execute(username: string, password: string): Promise<User | null> {
        const user = await this.userRepo.findByUsername(username);
        if (!user) return null;
        const match = bcrypt.compareSync(password, user.passwordHash);
        return match ? user : null;
    }
}
