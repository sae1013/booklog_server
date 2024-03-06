import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { User } from './user.entity';
import { Profile } from 'src/profile/profile.entity';
import { UserInterface } from './types/user';
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

  signUp(userInfo: UserInterface) {
    return this.userRepository.save(userInfo);
  }

  async signUpTest() {
    const user = new User();
    user.email = `random-${Date.now()}@example.com`; // 랜덤 이메일 생성
    user.channel = 'Test Channel';
    user.status = 'Active';
    const savedUser = await this.dataSource.manager.save(user);

    const profile = new Profile();
    profile.userId = savedUser.id;
    profile.name = 'Random Name';
    profile.nickName = 'RandomNick';
    profile.gender = Math.random() > 0.5 ? 1 : 0; // 예시: 0 또는 1로 성별 설정
    profile.address = 'Random Address';
    profile.phoneNumber = '123-456-7890';
    profile.profileUrl = '@sae1013';
    user.profile = profile;
    await this.dataSource.manager.save(user);
  }

  async remove(user_id: string): Promise<void> {
    this.userRepository.delete(user_id);
  }
}
