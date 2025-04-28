import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Profile } from './profile.entity';
import { Social } from './social.entity';

@Entity({ name: 'profile_social' })
@Unique(['profileID', 'socialID'])
export class ProfileSocial {
    @PrimaryGeneratedColumn('uuid', { name: 'id'})
        id: string;
        
    @Column({ name: 'profile_id' })
    profileID: string;

    @Column({ name: 'social_id' })
    socialID: string;

    @Column({ name: 'link', type: 'text' })
    link: string;

    @ManyToOne(() => Profile)
    @JoinColumn({ name: 'profile_id' })
    profile: Profile;

    @ManyToOne(() => Social)
    @JoinColumn({ name: 'social_id' })
    social: Social;

}
