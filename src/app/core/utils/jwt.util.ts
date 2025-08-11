export interface JwtPayload {
  sub?: string;
  email?: string;
  exp?: number;
  iss?: string;
  aud?: string;
  role?: string | string[];
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'?: string | string[];
  [key: string]: any;
}

export function decodeJwt(token: string): JwtPayload | null {
  try {
    const [, payloadB64] = token.split('.');
    if (!payloadB64) return null;

    // base64url → base64
    const b64 = payloadB64.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(b64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

// คืน roles เป็น array เสมอ โดยรองรับทั้ง key ปกติและแบบ URI ของ .NET
export function extractRoles(payload: JwtPayload | null): string[] {
  if (!payload) return [];
  const raw =
    payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ??
    payload.role ??
    payload["roles"];

 console.log('extractRoles', { payload, raw });
  if (!raw) return [];
  if (Array.isArray(raw)) return raw.map(r => String(r));
  return [String(raw)];
}

export function isExpired(payload: JwtPayload | null, skewSeconds = 0): boolean {
  if (!payload?.exp) return true;
  const now = Math.floor(Date.now() / 1000) + skewSeconds;
  return payload.exp <= now;
}
