import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {
    this.authService = authService;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request): Promise<boolean> {
    if (!request.header('Authorization')) {
      return false;
    }

    const token: string = request
      .header('Authorization')
      .replace('Bearer ', '');

    let data;
    try {
      data = jwt.verify(token, process.env.JWT_KEY);
    } catch (ex) {
      return false;
    }

    const user = await this.authService.findTutorById(data.id);

    if (!user) {
      return false;
    }

    request.user = user;
    return true;
  }
}
