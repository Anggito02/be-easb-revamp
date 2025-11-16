import { ConflictException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from '../../domain/user/user.repository';
import { User } from '../../domain/user/user.entity';
import { ValidateUserUseCase } from './use_cases/validate_user.use_case';
import { UserService } from 'src/domain/user/user.service';
import { LoginDto } from 'src/presentation/auth/dto/login.dto';
import { CreateUserDto } from 'src/presentation/users/dto/create_user.dto';
import bcrypt from 'bcryptjs';

@Injectable()
export class UserServiceImpl implements UserService {
    private readonly validateUserUseCase: ValidateUserUseCase;

    constructor(private readonly userRepo: UserRepository) {
        this.validateUserUseCase = new ValidateUserUseCase(userRepo);
    }

    async create(userDto: CreateUserDto): Promise<User> {
        try {
            // cek username existing
            const exists = await this.userRepo.findByUsername(userDto.username);
            if (exists) {
                throw new ConflictException('Username already exists');
            }
            
            // hash password
            userDto.password = bcrypt.hashSync(userDto.password);

            // create user
            const newUser = await this.userRepo.create(userDto); 
            
            const { passwordHash: _, ...safe } = newUser as any;
            return safe as User;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }

            throw new InternalServerErrorException("Failed to create user");
        }
    }

    async validateUser(dto: LoginDto): Promise<User | null> {
        try {
            return await this.validateUserUseCase.execute(dto);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to validate user');
        }
    }

    async findByUsername(username: string): Promise<User | null> {
        try {
            return await this.userRepo.findByUsername(username);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to find user by username');
        }
    }

    async findById(id: number): Promise<User | null> {
        try {
            const user = await this.userRepo.findById(id);
            return user;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to find userby id')
        }
    }
}
