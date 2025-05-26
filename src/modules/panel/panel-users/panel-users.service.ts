import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Pagination } from 'src/types/public.type';
import { Like, Repository } from 'typeorm';

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

  async searchUsersCount(search: string) {
    const usersCount = await this.userRepository.count({
      where: {
        profile: [
          {
            firstName: Like(`%${search}%`),
          },
          {
            lastName: Like(`%${search}%`),
          },
          {
            title: Like(`%${search}%`),
          },
        ],
      },
    });

    return usersCount;
  }

  async searchUsers(
    { search, teamID }: { search: string; teamID?: string },
    pagination?: Pagination,
  ) {
    // const users = await this.userRepository.find({
    //   where: {
    //     profile: [
    //       {
    //         firstName: Like(`%${search}%`),
    //       },
    //       {
    //         lastName: Like(`%${search}%`),
    //       },
    //       {
    //         title: Like(`%${search}%`),
    //       },
    //     ],
    //     teams: [
    //       {
    //         teamID,
    //       },
    //     ],
    //   },
    //   relations: {
    //     profile: true,
    //     teams: !!teamID,
    //   },
    //   select: {
    //     id: true,
    //     profile: {
    //       id: true,
    //       firstName: true,
    //       lastName: true,
    //       title: true,
    //       image: true,
    //     },
    //     role: true,
    //   },
    //   skip:
    //     pagination?.count &&
    //     pagination?.page &&
    //     pagination.page * pagination.count,
    //   take: pagination?.count,
    // });

    const users = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.role'])
      .innerJoinAndSelect(
        'user.profile',
        'profile',
        'user.id = profile.user_id',
      )
      .leftJoinAndSelect('user.teams', 'team')
      .leftJoin(
        'userteam',
        'userTeam',
        'userTeam.user_id = user.id AND userTeam.team_id = team.id AND team.id = :teamID',
        { teamID },
      )
      .where('profile.first_name LIKE :search', { search: `%${search}%` })
      .orWhere('profile.last_name LIKE :search', { search: `%${search}%` })
      .orWhere('profile.title LIKE :search', { search: `%${search}%` })
      .skip(
        pagination?.count &&
          pagination?.page &&
          pagination.page * pagination.count,
      )
      .take(pagination?.count)
      .getMany();

    return users;
  }
}
