import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, User])],
  providers: [ProfileService],
  controllers: [ProfileController],
  exports: [ProfileModule, ProfileService],
})
export class ProfileModule {}
