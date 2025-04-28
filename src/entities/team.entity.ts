import { TeamTypeEnum } from '../enums/teamType-enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'team' })
export class Team {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'title', length: 20 })
  title: string;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: TeamTypeEnum , name: 'type' })
  type: TeamTypeEnum;
}
