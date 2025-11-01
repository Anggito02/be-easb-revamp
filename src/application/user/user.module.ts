import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserOrmEntity } from '../../infrastructure/user/orm/user.orm-entity';
import { UserRepositoryImpl } from '../../infrastructure/user/repositories/user.repository.impl';
import { UserRepository } from '../../domain/user/user.repository';
// Anda dapat menambahkan UsersController jika ingin expose endpoint user publik

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  providers: [
    UserService,
    UserRepositoryImpl,
    {
      provide: UserRepository,
      useExisting: UserRepositoryImpl,
    },
  ],
  exports: [UserService],
})
export class UsersModule {}
