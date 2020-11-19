import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { TutorDto } from './dtos/TutorDto';
import { AuthGuard } from '../shared/guards/auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Req() req, @Res() res) {
    return this.authService.login(req, res);
  }

  @UseGuards(AuthGuard)
  @Get('/tutor/:id')
  findTutorById(@Param('id') id): Promise<TutorDto> {
    return this.authService.findTutorById(id);
  }
}
