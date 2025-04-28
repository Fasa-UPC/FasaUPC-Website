import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { UserRoleEnum } from '../../enums/userRole-enum';
import { Repository } from 'typeorm';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getDevCount(): Promise<number> {
    const devsCount = await this.usersRepository.count({
      where: {
        role: UserRoleEnum.DEVELOPER,
      },
    });

    return devsCount;
  }
}
