// import {
//   Entity,
//   OneToOne,
//   JoinColumn,
//   PrimaryColumn,
//   Column,
//   ManyToOne,
// } from 'typeorm';
// import { Book } from 'src/book/book.entity';
// import { User } from 'src/user/user.entity';

// import { PrimaryGeneratedColumn } from 'typeorm';

// @Entity('userbook')
// export class UserBook {
//   @PrimaryGeneratedColumn('increment')
//   id: number;

//   //책을 읽기시작한 날짜
//   @Column()
//   startDate: Date;

//   //책을 다 읽은날짜
//   @Column()
//   finishedDate: Date; // 책을 읽기 시작한 날짜

//   @ManyToOne(() => User, (user) => user.userBooks)
//   @JoinColumn({ name: 'userId' })
//   user: User;

//   @ManyToOne(() => Book, (book) => book.userBooks)
//   @JoinColumn({ name: 'bookId' })
//   book: Book;
// }

// // userid를 비교한다음, 여기서 -> 책 방향으로 조회해야함.
