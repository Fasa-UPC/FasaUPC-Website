import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'skill' })
export class Skill {
  @PrimaryGeneratedColumn('uuid', { name: 'id'})
    id: string;

  @Column({ name: 'title', length: 20})
  title: string;

  @Column({ name: 'image', type: 'text' })
  image: string;
}
