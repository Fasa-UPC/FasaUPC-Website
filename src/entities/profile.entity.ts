import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'profile' })
export class Profile {
  @PrimaryGeneratedColumn('uuid', { name: 'id'})
    id: string;

  @Column({ name: 'user_id'})
  userID: string;

  @Column({ name: 'first_name', length: 15 })
  firstName: string;

  @Column({ name: 'last_name', length: 20 })
  lastName: string;

  @Column({ name: 'title', length: 20 })
  title: string;

  @Column({ name: 'province' })
  province: string;

  @Column({ name: 'city' })  
  city: string;

  @Column({ name: 'summary', type: 'text' })
  summary: string;

  @Column({ name: 'image', type: 'text' })
  image: string;

  @Column({ name: 'banner', type: 'text' })  
  banner: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
