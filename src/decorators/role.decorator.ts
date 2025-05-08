import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: ('user' | 'admin' | 'developer')[]) => {
    return SetMetadata('roles', roles);
};
