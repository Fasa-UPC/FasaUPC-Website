import { Module } from '@nestjs/common';
import { PanelService } from './panel.service';
import { PanelController } from './panel.controller';
import { PanelUsersModule } from './panel-users/panel-users.module';
import { TeamsModule } from './panel-teams/teams.module';

@Module({
  controllers: [PanelController],
  providers: [PanelService],
  imports: [PanelUsersModule, TeamsModule],
})
export class PanelModule {}
