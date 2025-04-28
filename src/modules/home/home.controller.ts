import { Controller, Get, Render } from '@nestjs/common';
import { HomeService } from './home.service';

@Controller()
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  @Render('index')
  async indexPage() {
    // Members count / DONE
    // Articles count
    // Projects count
    // Top projects
    // Top devs
    // Top teams
    // Testimonials
    const [devsCount] = await Promise.all([this.homeService.getDevCount()]);
    return { message: devsCount };
  }
}
