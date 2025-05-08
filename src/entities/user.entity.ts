import { UserRoleEnum } from '../enums/userRole-enum';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from './profile.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'sso_id', unique: true })
  ssoID: string;

  @Column({ type: 'enum', enum: UserRoleEnum, name: 'role' })
  role: UserRoleEnum;

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  profile: Profile;
}
