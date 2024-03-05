import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

const todo = ['hello world'];
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('data')
  getData() {
    return todo;
  }

  @Post('data')
  writeHello(@Req() req, res): string {
    const data = req.body;
    todo.push(data);
    // console.log(body);
    return 'Success';
  }
}
