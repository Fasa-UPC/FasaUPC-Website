import { UserRoleEnum } from '../enums/userRole-enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'sso_id', unique: true })
  ssoID: string;

  @Column({ type: 'enum', enum: UserRoleEnum , name: 'role' })
  role: UserRoleEnum;
}
