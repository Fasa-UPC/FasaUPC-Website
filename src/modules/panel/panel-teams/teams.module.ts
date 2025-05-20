import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from 'src/entities/team.entity';
import { UserTeam } from 'src/entities/userTeam.entity';
import { ProjectTeam } from 'src/entities/projectTeam.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, UserTeam, ProjectTeam])],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
