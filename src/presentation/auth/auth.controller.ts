import { Controller, Post, Body, UseGuards, Res, Req } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from '../../application/auth/auth.service';
import { ResponseDto } from 'src/common/dto/response.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { RefreshJwtAuthGuard } from 'src/common/guards/jwt_refresh.guard';
import { Role } from 'src/domain/user/user_role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RevokeAllDto } from './dto/revoke_all.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @Post('login')
    async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response): Promise<ResponseDto> {
        const user = await this.authService.validateUser(dto);

        // Only allow Verifikator, OPD, Guest (not Admin/Superadmin)
        const isNonAdmin = user.roles.some(r => [Role.VERIFIKATOR, Role.OPD, Role.GUEST].includes(r));
        if (!isNonAdmin) {
            return {
                status: 'error',
                responseCode: 403,
                message: 'Admin accounts must use the /auth/login-admin endpoint',
                data: null,
            };
        }

        const token = await this.authService.login(user);

        // SET refresh token via HttpOnly cookie
        res.cookie('refreshToken', token.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: token.maxAgeRefresh,
        });

        return {
            status: 'success',
            responseCode: 200,
            message: 'Login successful',
            data: {
                accessToken: token.accessToken,
            },
        };
    }

    @Public()
    @Post('login-admin')
    async loginAdmin(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response): Promise<ResponseDto> {
        const user = await this.authService.validateUser(dto);

        // Enforce admin-only: reject if user doesn't have ADMIN or SUPERADMIN role
        const isAdmin = user.roles.includes(Role.ADMIN) || user.roles.includes(Role.SUPERADMIN);
        if (!isAdmin) {
            return {
                status: 'error',
                responseCode: 403,
                message: 'This endpoint is for Admin and Superadmin only',
                data: null,
            };
        }

        const token = await this.authService.login(user);
        res.cookie('refreshToken', token.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: token.maxAgeRefresh,
        });

        return {
            status: 'success',
            responseCode: 200,
            message: 'Login successful',
            data: { accessToken: token.accessToken },
        };
    }

    @Public()
    @UseGuards(RefreshJwtAuthGuard)
    @Post('refresh')
    async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<ResponseDto> {
        const user = req.user as any; // { sub, username, roles }
        const tokens = await this.authService.rotateTokens({ id: user.sub, username: user.username, roles: user.roles, room_id: user.roomId ?? null } as any);

        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: tokens.maxAgeRefresh,
        });

        return { status: 'success', responseCode: 200, message: 'Token Rotated', data: { accessToken: tokens.accessToken } };
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) res: Response): Promise<ResponseDto> {
        res.clearCookie('refreshToken', { path: '/' });
        return { status: 'success', responseCode: 200, message: 'Logged out', data: null };
    }

    @Post('revoke-all')
    @Roles(Role.SUPERADMIN)
    async revokeAll(@Body() revokeDto: RevokeAllDto, @Res({ passthrough: true }) res: Response): Promise<ResponseDto> {
        await this.authService.revokeAllRefreshTokens(revokeDto);

        res.clearCookie('refreshToken', { path: '/' });
        return { status: 'success', responseCode: 200, message: 'All refresh tokens revoked', data: null };
    }
}
