import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Team } from './team.entity';
import { Project } from './project.entity';

@Entity({ name: 'project_team' })
export class ProjectTeam {
  @PrimaryGeneratedColumn('uuid', { name: 'id'})
      id: string;

  @Column({ name: 'project_id'})
  projectID: string;

  @Column({ name: 'team_id' })
  teamID: string;

  @Column({ name: 'collaboration' })
  collaboration: string;

  @ManyToOne(() => Team)
  @JoinColumn({ name: 'team_id' })
  team: Team;
  
  @ManyToOne(() => Project )
  @JoinColumn({ name: 'project_id' })
  project: Project;

}
