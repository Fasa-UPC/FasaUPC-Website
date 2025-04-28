import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tech' })
export class Tech {
  @PrimaryGeneratedColumn('uuid', { name: 'id'})
    id: string;

  @Column({ name: 'title', length: 20})
  title: string;

  @Column({ name: 'image', type: 'text' })
  image: string;
}
