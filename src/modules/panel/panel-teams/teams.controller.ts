import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Render,
} from '@nestjs/common';
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

  @Get(':id/edit')
  @Render('panel/teams/edit-team')
  async getEditTeamPage(@Param('id') id: string) {
    const team = await this.teamsService.getTeamByID(id);
    if (!team) {
      throw new NotFoundException();
    }
    console.log(team);
    return {
      team,
      layout: 'layouts/panel/main',
      headerTitle: `ویرایش تیم ${team?.title}`,
    };
  }

  @Post('')
  async createTeam(@Body() createTeamDTO: CreateTeamDTO) {
    const team = await this.teamsService.createTeam(createTeamDTO);

    return team;
  }
}
