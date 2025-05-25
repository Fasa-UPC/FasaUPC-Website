// import { TeamTypeEnum } from '../enums/teamType-enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectTeam } from './projectTeam.entity';
import { Project } from './project.entity';
import { UserTeam } from './userTeam.entity';
import { Expose } from 'class-transformer';

@Entity({ name: 'team' })
export class Team {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'title', length: 20 })
  title: string;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @OneToMany(() => ProjectTeam, (projectTeam) => projectTeam.team)
  projects: Project[];

  @OneToMany(() => UserTeam, (userTeam) => userTeam.team)
  users: UserTeam[];

  @Expose()
  usersCount: number;

  @Expose()
  projectsCount: number;
}
