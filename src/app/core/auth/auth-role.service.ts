// src/app/core/auth/auth-role.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { decodeJwt, extractRoles, isExpired, JwtPayload } from '../utils/jwt.util';

@Injectable({ providedIn: 'root' })
export class AuthRoleService {
  // token แบบ signal
  tokenSig = signal<string | null>(localStorage.getItem('token') ?? null);

  setToken(t: string | null) {
    if (t) localStorage.setItem('token', t);
    else localStorage.removeItem('token');
    this.tokenSig.set(t);
  }

  // ✅ payload / roles / isLoggedIn แบบ computed signals
  payloadSig = computed<JwtPayload | null>(() => {
    const t = this.tokenSig();
    return t ? decodeJwt(t) : null;
  });

  rolesSig = computed<string[]>(() => extractRoles(this.payloadSig()));

  isLoggedInSig = computed<boolean>(
    () => !!this.tokenSig() && !isExpired(this.payloadSig(), 10)
  );

  get token() { return this.tokenSig(); }
  get payload() { return this.payloadSig(); }
  get roles() { return this.rolesSig(); }
  get isLoggedIn() { return this.isLoggedInSig(); }
  get userId() { return this.payloadSig()?.sub ?? null; }

  hasRole(role: string) { return this.rolesSig().includes(role); }
}
