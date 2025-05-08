import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express'
import { JwtPayload } from 'src/types/public.type';

@Injectable()
export class OptionalUserAuthInterceptor implements NestInterceptor {
    constructor(private readonly jwtService: JwtService) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest<Request & { user?: JwtPayload }>();
        const token = req.cookies?.['access_token'];

        if (token) {
            try {
                const user = this.jwtService.verify<JwtPayload>(token);
                req.user = user;
            } catch (err) {
                console.warn('JWT Verification failed', err);
            }
        }

        return next.handle();
    }
}