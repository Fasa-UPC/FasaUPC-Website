import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.entity';
import { Profile } from './profile.entity';
import { ProfileSocial } from './profileSocial.entity';
import { ProjectTeam } from './projectTeam.entity';
import { Skill } from './skill.entity';
import { Social } from './social.entity';
import { Team } from './team.entity';
import { Tech } from './tech.entity';
import { TechProject } from './techProject.entity';
import { UserSkill } from './userSkill.entity';
import { UserTeam } from './userTeam.entity';

export const AppDataSource = new DataSource({
  type: 'mysql', 
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME, 
  database: process.env.DB_NAME, 
  password: process.env.DB_PASSWORD, 
  entities: [User, Project, Profile, ProfileSocial, ProjectTeam, Skill, Social, Team, Tech, TechProject, UserSkill, UserTeam], 
  synchronize: false,
  logging: true,
  migrations: ['src/migrations/*.ts'],
});
