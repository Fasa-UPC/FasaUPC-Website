import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Pagination } from 'src/types/public.type';
import { Repository } from 'typeorm';

@Injectable()
export class PanelUsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getUsersTable(pagination?: Pagination) {
    const users = await this.userRepository.find({
      skip:
        pagination?.count &&
        pagination?.page &&
        pagination.count * pagination.page,
      take: pagination?.count,
      relations: {
        profile: true,
      },
    });

    return users;
  }
}
