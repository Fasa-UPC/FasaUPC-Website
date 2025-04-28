import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from './profile.entity';
import { Skill } from './skill.entity';

@Entity({ name: 'user_skill' })
export class UserSkill {
  @PrimaryGeneratedColumn('uuid', { name: 'id'})
  id: string;

  @Column({ name: 'point', type: 'text' })  
  point: string;

  @Column({ name: 'profile_id'})
  profileID: string;

  @Column({ name: 'skill_id' })
  skillID: string;


  @ManyToOne(() => Profile)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;
  
  @ManyToOne(() => Skill)
  @JoinColumn({ name: 'skill_id' })
  skill: Skill;

}
