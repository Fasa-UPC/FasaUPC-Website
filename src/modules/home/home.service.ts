import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { UserRoleEnum } from '../../enums/userRole-enum';
import { Repository } from 'typeorm';
import { Project } from 'src/entities/project.entity';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Project) private projectsRepository: Repository<Project>,
  ) {}

  async getDevCount(): Promise<number> {
    const devsCount = await this.usersRepository.count({
      where: {
        role: UserRoleEnum.DEVELOPER,
      },
    });

    return devsCount;
  }

  async getProjectsCount(): Promise<number> {
    const projCount = await this.projectsRepository.count();

    return projCount;
  }
}
