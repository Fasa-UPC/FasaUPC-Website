import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Team } from './team.entity';

@Entity({ name: 'userTeam' })
export class UserTeam {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'user_id' })
  userID: string;

  @Column({ name: 'team_id' })
  teamID: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', foreignKeyConstraintName: 'FK_user_team' })
  user: User;

  @ManyToOne(() => Team)
  @JoinColumn({ name: 'team_id', foreignKeyConstraintName: 'FK_team_user' })
  team: Team;
}
