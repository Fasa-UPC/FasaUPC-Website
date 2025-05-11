import { Module } from '@nestjs/common';
import { PanelService } from './panel.service';
import { PanelController } from './panel.controller';
import { PanelUsersModule } from './panel-users/panel-users.module';

@Module({
  controllers: [PanelController],
  providers: [PanelService],
  imports: [PanelUsersModule],
})
export class PanelModule {}
