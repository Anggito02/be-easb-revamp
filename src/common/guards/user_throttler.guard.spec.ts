import { UserThrottlerGuard } from './user_throttler.guard';

describe('UserThrottlerGuard.getTracker', () => {
    const guard = Object.create(UserThrottlerGuard.prototype) as UserThrottlerGuard;

    it('uses user:{userId} when authenticated', async () => {
        const tracker = await (guard as any).getTracker({
            user: { userId: '42', username: 'opd' },
            ip: '10.0.0.1',
            headers: {},
        });
        expect(tracker).toBe('user:42');
    });

    it('falls back to first X-Forwarded-For hop when anonymous', async () => {
        const tracker = await (guard as any).getTracker({
            ip: '10.0.0.1',
            headers: { 'x-forwarded-for': '203.0.113.9, 10.0.0.1' },
        });
        expect(tracker).toBe('203.0.113.9');
    });

    it('falls back to req.ip when anonymous and no forwarded header', async () => {
        const tracker = await (guard as any).getTracker({
            ip: '127.0.0.1',
            headers: {},
        });
        expect(tracker).toBe('127.0.0.1');
    });
});
