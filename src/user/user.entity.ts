import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  Column,
  OneToMany,
} from 'typeorm';
import { Profile } from 'src/profile/profile.entity';
import { UserBook } from 'src/userbook/userbook.entity';

@Entity('user')
export class User {
  // 바뀌지 않는 것을 정의.
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false }) // 이메일 주소
  email: string;

  @Column({ nullable: false }) // 이메일에 설정한 본명
  name: string;

  @Column({ nullable: true }) // 처음 가입한 경로.
  channel: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastLogin: Date;

  @Column({ nullable: true })
  status: string;

  // 1:1 매칭
  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true }) // Profile 엔터티와의 1:1 관계를 설정
  profile: Profile;

  // user (1) : userBook (N)
  @OneToMany(() => UserBook, (userBook) => userBook.user)
  userBooks: UserBook[];
}
