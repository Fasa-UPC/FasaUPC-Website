import { 
    Injectable, 
    CanActivate, 
    ExecutionContext, 
    ForbiddenException 
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { JwtPayload } from 'src/types/public.type';



@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector,
    ) { }

    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest<Request & { user?: JwtPayload }>();
        const token = req.cookies?.['access_token'];

        if (!token) {
            throw new ForbiddenException('Access denied. No token found.');
        }

        try {
            const user = this.jwtService.verify<JwtPayload>(token);
            req.user = user;

            const rolesAllowed = this.reflector.get<string[]>('roles', context.getHandler());

            if (rolesAllowed.length > 0 && (!user.role || !rolesAllowed.includes(user.role))) {
                throw new ForbiddenException('Access denied. Insufficient permissions.');
            }

            return true;
        } catch (err) {
            throw new ForbiddenException('Access denied. Invalid token or expired.', err);
        }
    }
}
