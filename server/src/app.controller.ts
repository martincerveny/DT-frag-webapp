import { Controller, Get, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Redirect('/api')
  root() {
    //root
  }

  @Get('api')
  api() {
    return 'API';
  }
}
