import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/user/user.repository';
import { User } from '../../domain/user/user.entity';
import { ValidateUserUseCase } from '../../domain/user/use_cases/validate_user.use_case';

@Injectable()
export class UserService {
    private readonly validateUserUseCase: ValidateUserUseCase;

    constructor(private readonly userRepo: UserRepository) {
        this.validateUserUseCase = new ValidateUserUseCase(userRepo);
    }

    async findByUsername(username: string): Promise<User | null> {
        return this.userRepo.findByUsername(username);
    }

    async create(user: User): Promise<User> {
        return this.userRepo.create(user);
    }

    async validateUser(username: string, password: string): Promise<User | null> {
        return this.validateUserUseCase.execute(username, password);
    }
}
