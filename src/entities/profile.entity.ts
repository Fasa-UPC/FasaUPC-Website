import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'profile' })
export class Profile {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'user_id' })
  userID: string;

  @Column({ name: 'first_name', length: 15 })
  firstName: string;

  @Column({ name: 'last_name', length: 20 })
  lastName: string;

  @Column({ name: 'title', length: 20, nullable: true })
  title: string;

  @Column({ name: 'province', nullable: true })
  province: string;

  @Column({ name: 'city', nullable: true })
  city: string;

  @Column({ name: 'summary', type: 'text', nullable: true })
  summary: string;

  @Column({ name: 'image', type: 'text', nullable: true })
  image: string;

  @Column({ name: 'banner', type: 'text', nullable: true })
  banner: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
