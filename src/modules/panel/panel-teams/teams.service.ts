import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTeamDTO } from 'src/dtos/create-team.dto';
import { ProjectTeam } from 'src/entities/projectTeam.entity';
import { Team } from 'src/entities/team.entity';
import { UserTeam } from 'src/entities/userTeam.entity';
import { Pagination } from 'src/types/public.type';
import { Repository } from 'typeorm';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team) private readonly teamRepository: Repository<Team>,
    @InjectRepository(UserTeam)
    private readonly userTeamRepository: Repository<UserTeam>,
    @InjectRepository(ProjectTeam)
    private readonly projectTeamRepository: Repository<ProjectTeam>,
  ) {}

  async getTeamsTable(pagination?: Pagination) {
    let teams = await this.teamRepository.find({
      skip:
        pagination?.count &&
        pagination?.page &&
        pagination.page * pagination.count,
      take: pagination?.count,
    });

    const userTeamCounts = await Promise.all(
      teams.map((team) => this._getUserTeamCount(team.id)),
    );

    const projectTeamCounts = await Promise.all(
      teams.map((team) => this._getTeamProjectCount(team.id)),
    );

    teams = teams.map((team, index) => ({
      ...team,
      usersCount: userTeamCounts[index].count,
      projectsCount: projectTeamCounts[index].count,
    }));

    return teams;
  }

  async getTeamByID(id: string) {
    const team = await this.teamRepository.findOne({
      where: {
        id,
      },
      relations: {
        users: {
          user: {
            profile: true,
          },
        },
        projects: true,
      },
    });
    return team;
  }

  async _getUserTeamCount(id: string) {
    const userTeamCount = await this.userTeamRepository.countBy({
      teamID: id,
    });

    return {
      teamID: id,
      count: userTeamCount,
    };
  }

  async _getTeamProjectCount(id: string) {
    const teamProjectCount = await this.projectTeamRepository.countBy({
      teamID: id,
    });

    return {
      teamID: id,
      count: teamProjectCount,
    };
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

  async addMember({ teamID, userID }: { teamID: string; userID: string }) {
    const result = await this.userTeamRepository.save(
      this.userTeamRepository.create({
        teamID,
        userID,
      }),
    );

    return result;
  }

  async removeMember({ teamID, userID }: { teamID: string; userID: string }) {
    const result = await this.userTeamRepository.delete({
      userID,
      teamID,
    });

    return !!result.affected;
  }
}
