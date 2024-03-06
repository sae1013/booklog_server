import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { Profile } from 'src/profile/profile.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserModule, UserService],
})
export class UserModule {}
