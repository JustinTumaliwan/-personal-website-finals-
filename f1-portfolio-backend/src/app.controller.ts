import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api/guestbook')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAll() {
    return this.appService.getMessages();
  }

  @Post()
  async create(@Body() body: { visitor_name: string; message: string }) {
    return this.appService.addMessage(body.visitor_name, body.message);
  }
}