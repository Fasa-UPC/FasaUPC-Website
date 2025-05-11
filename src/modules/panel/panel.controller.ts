import { Controller, Get, Render } from '@nestjs/common';
import { PanelService } from './panel.service';

@Controller('panel')
export class PanelController {
  constructor(private readonly panelService: PanelService) {}

  @Get()
  @Render('panel/')
  getIndexView() {
    return {};
  }

}
