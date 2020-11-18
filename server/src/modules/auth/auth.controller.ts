import {Controller, Post, Req, Res, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthGuard} from "@nestjs/passport";


@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(AuthGuard('ldap'))
  @Post('/login')
  login(@Req() req, @Res() res) {
    return this.authService.login(req, res);
  }
}
