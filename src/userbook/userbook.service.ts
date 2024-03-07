import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserBook } from './userbook.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UserBookService {
  constructor(
    @InjectRepository(UserBook)
    private userBookRepository: Repository<UserBook>,
  ) {}

  // 해당 유저의 id를 기반으로 읽은 책 조회.
  getReadBookbyUserId({ user_id }) {
    // return this.userBookRepository.find({
    //   user_id,
    // });
  }
}
