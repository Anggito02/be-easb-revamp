/**
 * Smoke-test authenticated Nest rate limit (UserThrottlerGuard).
 * Login once, then flood a JWT-protected endpoint; expect at least one HTTP 429.
 *
 * Usage (BE must be running with a low RATE_REQ_LIMIT for a fast check):
 *   RATE_REQ_LIMIT=10 PORT=3011 node dist/main.js   # separate terminal
 *   E2E_API_URL=http://localhost:3011/api/dev/v1 RATE_REQ_LIMIT=10 node scripts/smoke-rate-limit.mjs
 *
 * Note: local `.env` may set RATE_REQ_LIMIT very high for E2E; override on the
 * process under test so this smoke can assert 429.
 */
const API = process.env.E2E_API_URL ?? 'http://localhost:3001/api/dev/v1';
const USERNAME = process.env.SMOKE_USER ?? 'UserDPUDPR';
const PASSWORD = process.env.SMOKE_PASS ?? '12345678';
const LIMIT = parseInt(process.env.RATE_REQ_LIMIT ?? '100', 10);
const FLOOD_COUNT = LIMIT + 30;
const TARGET = '/users/profile/me';

async function login() {
  let lastError = 'unknown error';
  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: USERNAME, password: PASSWORD }),
    });
    const json = await res.json().catch(() => ({}));
    if (res.ok && json.status === 'success' && json.data?.accessToken) {
      return json.data.accessToken;
    }
    lastError = json.message ?? String(res.status);
    if (res.status === 429 && attempt < 4) {
      await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
      continue;
    }
    break;
  }
  throw new Error(`Login failed for ${USERNAME}: ${lastError}`);
}

async function main() {
  console.log(`API=${API} user=${USERNAME} flood=${FLOOD_COUNT} target=${TARGET}`);
  const token = await login();
  console.log('Login OK');

  let hit429 = false;
  let retryAfter = null;
  let lastStatus = 0;

  for (let i = 0; i < FLOOD_COUNT; i++) {
    const res = await fetch(`${API}${TARGET}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    lastStatus = res.status;
    if (res.status === 429) {
      hit429 = true;
      retryAfter = res.headers.get('retry-after');
      console.log(`429 at request #${i + 1}; Retry-After=${retryAfter ?? '(none)'}`);
      break;
    }
    if (!res.ok && res.status !== 429) {
      const body = await res.text().catch(() => '');
      throw new Error(`Unexpected status ${res.status} at #${i + 1}: ${body.slice(0, 200)}`);
    }
  }

  if (!hit429) {
    console.error(
      `FAIL: no 429 after ${FLOOD_COUNT} requests (last status=${lastStatus}). ` +
        `Check RATE_REQ_LIMIT on the running BE matches ${LIMIT}.`,
    );
    process.exit(1);
  }

  console.log('PASS: authenticated rate limit returned 429');
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
