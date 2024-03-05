import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryColumn()
  user_id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phoneNumber: string;
}
