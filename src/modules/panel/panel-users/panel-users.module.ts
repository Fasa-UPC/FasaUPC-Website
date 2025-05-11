import { Module } from '@nestjs/common';
import { PanelUsersService } from './panel-users.service';
import { PanelUsersController } from './panel-users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [PanelUsersController],
  providers: [PanelUsersService],
})
export class PanelUsersModule {}
