import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Role } from 'src/domain/user/user_role.enum';

export type JwtPayload = { sub: string; username: string; roles: string[]; idOpd: number | null; roomId: number | null };

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.getOrThrow<string>('jwt.accessSecret'),
        });
    }

    async validate(payload: JwtPayload) {
        const isSuperadmin = payload.roles?.includes(Role.SUPERADMIN) ?? false;
        const roomId = isSuperadmin ? null : (payload.roomId ?? null);
        return { userId: payload.sub, username: payload.username, roles: payload.roles, idOpd: payload.idOpd, roomId };
    }
}
