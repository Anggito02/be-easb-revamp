# Authentication and authorization

## JWT access token

- After login, clients use the **access token** returned in the JSON body (`data.accessToken`) as a Bearer token.
- Access tokens are configured in [`AuthModule`](../src/presentation/auth/auth.module.ts) via `@nestjs/jwt` using `JWT_ACCESS_SECRET` and `JWT_ACCESS_TTL` (see [`configuration.ts`](../src/config/configuration.ts)).

## Refresh token (cookie)

- On **login** and **refresh**, the API sets an **`httpOnly`** cookie named `refreshToken` (see [`auth.controller.ts`](../src/presentation/auth/auth.controller.ts)).
- Clients calling `POST /auth/refresh` must send that cookie (browser or `credentials: 'include'` for SPAs on allowed origins).
- Refresh uses [`RefreshJwtAuthGuard`](../src/common/guards/jwt_refresh.guard.ts) and [`RefreshJwtStrategy`](../src/application/auth/refresh.strategy.ts).

## Global JWT guard

- [`JwtAuthGuard`](../src/common/guards/jwt_auth.guard.ts) is registered as an `APP_GUARD` in [`AppModule`](../src/app.module.ts) (before `RolesGuard` and `UserThrottlerGuard`).
- Routes marked with [`@Public()`](../src/common/decorators/public.decorator.ts) skip JWT validation (e.g. `POST /auth/login`, `POST /auth/refresh`).

## Roles

- [`RolesGuard`](../src/common/guards/roles.guard.ts) is also registered globally in `AppModule` (after JWT).
- Use [`@Roles(...)`](../src/common/decorators/roles.decorator.ts) with [`Role`](../src/domain/user/user_role.enum.ts) on controllers/handlers where needed.
- Example: `POST /auth/revoke-all` requires `SUPERADMIN`.

## Throttling

- Global [`UserThrottlerGuard`](../src/common/guards/user_throttler.guard.ts): `RATE_TIME_LIMIT` / `RATE_REQ_LIMIT` (default 100 req / 60s). Tracker is `user:{userId}` when JWT is present, otherwise client IP (`X-Forwarded-For` / `req.ip`).
- Login and refresh use `@Throttle` with `RATE_AUTH_TIME_LIMIT` / `RATE_AUTH_REQ_LIMIT` (see [`auth.controller.ts`](../src/presentation/auth/auth.controller.ts)).
- Smoke: `node scripts/smoke-rate-limit.mjs` (expects at least one HTTP 429 after authenticated flood).

## Environment variables

| Variable | Role |
|----------|------|
| `JWT_ACCESS_SECRET` | Sign access tokens |
| `JWT_REFRESH_SECRET` | Sign refresh tokens |
| `JWT_ACCESS_TTL` / `JWT_REFRESH_TTL` | Token lifetimes |
| `RATE_TIME_LIMIT` / `RATE_REQ_LIMIT` | Global API throttling (per user or IP) |
| `RATE_AUTH_TIME_LIMIT` / `RATE_AUTH_REQ_LIMIT` | Auth endpoint throttling |

## Logout

- `POST /auth/logout` clears the refresh cookie (access token must be discarded client-side).
