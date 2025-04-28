import { ProjectStatus } from '../enums/projectStatus-enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'project' })
export class Project {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

  @Column({ name: 'title', length: 20})
  title: string;

  @Column({ type: 'enum', enum: ProjectStatus, name: 'status' })
  status: ProjectStatus;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @Column({ name: 'image', type: 'text' })
  image: string;

  @Column({ name: 'type' })
  type: string;

  @Column({ name: 'banner', type: 'text' })  
  banner: string;

  @Column({ name: 'begin_date', type: 'date' })
  beginDate: Date;

  @Column({ name: 'end_date', type: 'date' })
  endDate: Date;

  @Column({ name: 'online_link', type: 'text' })
  onlineLink: string;

  @Column({ name: 'github_link', type: 'text' }) 
  githubLink: string;

}
