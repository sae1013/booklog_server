// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   PrimaryColumn,
//   Column,
//   OneToMany,
// } from 'typeorm';
// import { UserBook } from 'src/userbook/userbook.entity';

// @Entity('book')
// export class Book {
//   @PrimaryGeneratedColumn('increment')
//   id: string;

//   @Column({ nullable: true })
//   isbn: string;

//   @OneToMany(() => UserBook, (userBook) => userBook.book)
//   userBooks: UserBook[];

//   // API Call로 필요한 필드 작성
// }

// // 사용자 ID를 외부에 노출시킨다.
// //
