import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class UserThrottlerGuard extends ThrottlerGuard {
    protected async getTracker(req: Record<string, any>): Promise<string> {
        const userId = req.user?.userId;
        if (userId != null && userId !== '') {
            return `user:${userId}`;
        }
        const forwarded = req.headers?.['x-forwarded-for'];
        if (typeof forwarded === 'string' && forwarded.length > 0) {
            return forwarded.split(',')[0].trim();
        }
        return req.ip ?? req.socket?.remoteAddress ?? 'unknown';
    }
}
