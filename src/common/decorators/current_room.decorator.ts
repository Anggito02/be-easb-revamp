import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentRoom = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): number | null => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user as { roomId?: number | null };
        return user?.roomId ?? null;
    },
);
