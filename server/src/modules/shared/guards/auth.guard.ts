import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
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
    const data: any = jwt.verify(token, process.env.JWT_KEY);

    const user = 'await this.userService.findById(data.id);'

    if (!user) {
      return false;
    }

    request.user = user;
    return true;
  }
}
