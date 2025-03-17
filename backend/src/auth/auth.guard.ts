import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAccessTokenAuthGuard extends AuthGuard('jwt-access') {}

@Injectable()
export class JwtRefreshTokenAuthGuard extends AuthGuard('jwt-refresh') {}

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}