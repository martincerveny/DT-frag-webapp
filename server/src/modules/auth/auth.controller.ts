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
import { TeacherDto } from './dtos/TeacherDto';
import { AuthGuard } from '../shared/guards/auth.guard';

/**
 * Routes for authentication
 */
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Req() req, @Res() res) {
    return this.authService.login(req, res);
  }

  @UseGuards(AuthGuard)
  @Get('/teacher/:id')
  findTeacherById(@Param('id') id): Promise<TeacherDto> {
    return this.authService.findTeacherById(id);
  }
}
