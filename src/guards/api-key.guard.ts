import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

const HARDCODED_TOKEN = 'cbbU7yWFGznUx6V4gxq1a';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const token = (req.headers['authorization'] || '').replace('Bearer ', '');

    return token === HARDCODED_TOKEN;
  }
}
