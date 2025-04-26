import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './modules/projects/projects.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { dataSourceOptions } from './config/typeorm.config';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
