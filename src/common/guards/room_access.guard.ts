import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/domain/user/user_role.enum';

@Injectable()
export class RoomAccessGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user as { roles: Role[]; roomId: number | null } | undefined;

        if (!user) return true; // unauthenticated (handled by JwtAuthGuard)

        // SUPERADMIN: always allowed
        if (user.roles.includes(Role.SUPERADMIN)) return true;

        // Non-superadmin: derive requested room_id from route param or query or header
        const paramRoomId = request.params?.roomId
            ? parseInt(request.params.roomId, 10)
            : null;
        const queryRoomId = request.query?.room_id
            ? parseInt(request.query.room_id as string, 10)
            : null;
        const headerRoomId = request.headers?.['x-room-id']
            ? parseInt(request.headers['x-room-id'] as string, 10)
            : null;

        const requestedRoomId = paramRoomId ?? queryRoomId ?? headerRoomId;

        // If no room_id specified in request: allow (controller will use JWT roomId)
        if (requestedRoomId === null) return true;

        // If user has a room_id: enforce it matches
        if (user.roomId !== null && requestedRoomId !== user.roomId) {
            throw new ForbiddenException('You do not have access to this room');
        }

        return true;
    }
}
