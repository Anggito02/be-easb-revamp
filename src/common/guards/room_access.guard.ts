import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

// This guard enforces room-scoping for non-Superadmin users.
// It will be activated in Phase 3 when master data gets room_id.
// For now: always return true (placeholder).
@Injectable()
export class RoomAccessGuard implements CanActivate {
    canActivate(_context: ExecutionContext): boolean {
        return true; // Activated in Phase 3
    }
}
