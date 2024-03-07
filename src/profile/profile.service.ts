import { Injectable } from '@nestjs/common';
import { Profile } from './profile.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import {
  publicProfileInfoKeys,
  publicUserInfoKeys,
} from './utils/profile-utils';
@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findUserWithProfileByUserId(userId) {
    // userId와 profile join 을 통해서 가져오기
    // table join 으로 profile 가져오기.
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['profile'],
    });
    const profile = user.profile;

    const publicUserWithProfile = {};
    publicUserInfoKeys.forEach(
      (key) => (publicUserWithProfile[key] = user[key]),
    );
    publicProfileInfoKeys.forEach(
      (key) => (publicProfileInfoKeys[key] = profile[key]),
    );
    return publicUserWithProfile;
  }
}
