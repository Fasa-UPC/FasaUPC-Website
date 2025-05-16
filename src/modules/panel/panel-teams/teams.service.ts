import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTeamDTO } from 'src/dtos/create-team.dto';
import { Team } from 'src/entities/team.entity';
import { Pagination } from 'src/types/public.type';
import { Repository } from 'typeorm';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team) private readonly teamRepository: Repository<Team>,
  ) {}

  async getTeamsTable(pagination?: Pagination) {
    const teams = await this.teamRepository.find({
      skip:
        pagination?.count &&
        pagination?.page &&
        pagination.page * pagination.count,
      take: pagination?.count,
    });

    console.log(teams);

    return teams;
  }

  async createTeam(createTeamDTO: CreateTeamDTO) {
    try {
      let team = this.teamRepository.create({
        title: createTeamDTO.title,
        description: createTeamDTO.description,
        // type: createTeamDTO.type,
      });

      team = await this.teamRepository.save(team);

      return team;
    } catch (error) {
      console.log(error);
    }
  }
}
