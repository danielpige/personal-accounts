import { UseGuards } from '@nestjs/common';

import { applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from '../enums/user-role.enum';
import { RoleProtected } from './role-protected.decorator';
import { UserRoleGuard } from '../guards/user-role/user-role.guard';

export function Auth(...roles: UserRole[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
}
