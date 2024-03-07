import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { User } from './user.entity';
import { Profile } from 'src/profile/profile.entity';
// import { UserInterface } from './types/user';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectDataSource() private dataSource: DataSource,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  //NOTE: KAKAO, GOOGLE 모두 사용합니다.
  async signUpAndInitializeProfile(authUserInfo) {
    const user = new User();
    const savedUser = await this.userRepository.save(authUserInfo);

    const profile = new Profile();
    profile.userId = savedUser.id;
    profile.nickName = authUserInfo.name;
    profile.gender = authUserInfo.gender || '';
    profile.address = authUserInfo.address || '';
    profile.phoneNumber = authUserInfo.phoneNumber || '';
    //TODO: profile이 동일한게 있는지 검사하고 뒤에 해시를 추가하도록 해야합니다
    profile.profileUrl =
      '@' + authUserInfo.email.substring(0, authUserInfo.email.indexOf('@'));
    user.profile = profile;
    return await this.dataSource.manager.save(user);
  }

  async remove(user_id: string): Promise<void> {
    this.userRepository.delete(user_id);
  }
}
