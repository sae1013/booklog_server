import {
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { UserBook } from 'src/userbook/userbook.entity';

@Entity('book')
export class Book {
  @PrimaryGeneratedColumn('increment')
  id: string;

  //isbn 10 혹은 13자리 코드
  @Column({ nullable: true })
  isbn: string;

  //출판사
  @Column({ nullable: true })
  publisher: string;

  //작가
  @Column({ nullable: true })
  author: string;

  //제목
  @Column({ nullable: true })
  title: string;

  //커버이미지
  @Column({ nullable: true })
  coverImageUrl: string;

  // 상품링크
  @Column({ nullable: true })
  productLink: string;

  // 설명 (불필요 시 삭제)
  @Column({ nullable: true })
  description: string;

  @OneToMany(() => UserBook, (userBook) => userBook.book)
  userBooks: UserBook[];

  // API Call로 필요한 필드 작성
}

// 사용자 ID를 외부에 노출시킨다.
//
