import { UserRoleEnum } from '../enums/userRole-enum';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './profile.entity';
import { UserTeam } from './userTeam.entity';

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

  @OneToMany(() => UserTeam, (userTeam) => userTeam.user)
  teams: UserTeam[];
}
