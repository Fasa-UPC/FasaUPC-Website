import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './modules/projects/projects.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { dataSourceOptions } from './config/typeorm.config';
import { TeamsService } from './modules/teams/teams.service';
import { HomeModule } from './modules/home/home.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // ignoreEnvFile: true,
      load: [configuration],
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      ...dataSourceOptions,
    }),

    ProjectsModule,

    ProfilesModule,

    HomeModule,

    AuthModule,
  ],
  controllers: [],
  providers: [TeamsService],
})
export class AppModule {}
