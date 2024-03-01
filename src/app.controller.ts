import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('writeHello/test')
  writeHello(@Req() req, res): string {
    console.log(req.body.name);
    // console.log(body);
    return 'Success';
  }
}
