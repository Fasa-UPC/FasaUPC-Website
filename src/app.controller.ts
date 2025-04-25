import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  @Render('index')
  getHome() {
    return {
      message: `Hello, World from port`,
    };
  }
}
