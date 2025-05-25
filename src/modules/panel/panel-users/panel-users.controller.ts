import { Controller, Get, Query, Render } from '@nestjs/common';
import { PanelUsersService } from './panel-users.service';

@Controller('panel/users')
export class PanelUsersController {
  constructor(private readonly panelUsersService: PanelUsersService) {}

  @Get('')
  @Render('panel/users')
  async getPanelUsersView(
    @Query('page') page: number,
    @Query('count') count: number,
  ) {
    const users = await this.panelUsersService.getUsersTable({ count, page });
    return {
      users,
      headerTitle: 'مدیریت کاربران',
      layout: 'layouts/panel/main',
    };
  }

  @Get('search')
  async searchUsers(
    @Query('page') page: number,
    @Query('count') count: number,
    @Query('search') search: string,
    @Query('teamID') teamID: string,
  ) {
    const users = await this.panelUsersService.searchUsers(
      { search, teamID },
      {
        page,
        count,
      },
    );

    return users;
  }

  @Get('search/count')
  async searchUsersCount(@Query('search') search: string) {
    const userCount = await this.panelUsersService.searchUsersCount(search);

    return { count: userCount };
  }
}
