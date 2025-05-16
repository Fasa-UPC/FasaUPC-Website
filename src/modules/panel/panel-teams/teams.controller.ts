import { Body, Controller, Get, Post, Query, Render } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDTO } from 'src/dtos/create-team.dto';

@Controller('panel/teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get('')
  @Render('panel/teams/')
  async getIndex(@Query('page') page?: number, @Query('count') count?: number) {
    const [teams] = await Promise.all([
      this.teamsService.getTeamsTable({ count, page }),
    ]);
    return {
      teams,
      offset: (page && count && page * count) || 0,
      name: 'Mohammad',
      headerTitle: 'مدیریت تیم ها',
      layout: 'layouts/panel/main',
    };
  }

  @Get('new')
  @Render('panel/teams/new-team')
  getNewTeamPage() {
    return { layout: 'layouts/panel/main', headerTitle: 'تیم جدید' };
  }

  @Post('')
  async createTeam(@Body() createTeamDTO: CreateTeamDTO) {
    const team = await this.teamsService.createTeam(createTeamDTO);

    return team;
  }
}
