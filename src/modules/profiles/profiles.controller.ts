import { Controller, Get, Param, Render } from '@nestjs/common';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  @Render('profiles')
  getAll() {
    return;
  }

  @Get(':slug')
  @Render('profiles/profile')
  getProfile(@Param('slug') slug: string) {
    return {
      profile: slug,
    };
  }
}
