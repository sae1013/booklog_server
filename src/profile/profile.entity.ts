import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity('profile')
export class Profile {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, unique: true })
  profileUrl: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  nickName: string;

  @Column()
  gender: number;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToOne(() => User, { onDelete: 'CASCADE' }) // User 엔터티와의 1:1 관계를 설정
  @JoinColumn({ name: 'userId' }) // 이 데코레이터를 사용하여 FK를 명시적으로 지정
  user: User; // 칼럼명은 userId임.
}
