import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(user_id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ user_id });
  }

  async remove(user_id: string): Promise<void> {
    this.userRepository.delete(user_id);
  }
}
