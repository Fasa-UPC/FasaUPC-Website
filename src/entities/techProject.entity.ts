import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tech } from './tech.entity';
import { Project } from './project.entity';

@Entity({ name: 'tech_project' })
export class TechProject {
  @PrimaryGeneratedColumn('uuid', { name: 'id'})
  id: string;

  @Column({ name: 'tech_id'})
  techID: string;

  @Column({ name: 'project_id' })
  projectID: string;

  @Column({ name: 'share', type: 'float' })
  share: number;

  @Column({ name: 'description', type: 'text' })  
  description: string;

  @ManyToOne(() => Tech)
  @JoinColumn({ name: 'tech_id' })
  tech: Tech;
  
  @ManyToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  project: Project;

}
