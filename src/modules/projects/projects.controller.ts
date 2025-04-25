import { Controller, Get, Param, Render } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @Render('projects')
  getProjects() {
    return {};
  }

  @Get(':slug')
  @Render('projects/project')
  getProject(@Param('slug') slug: string) {
    return {
      project: slug,
    };
  }
}
