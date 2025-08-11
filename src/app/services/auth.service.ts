// src/app/services/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResult, catchApiError, unwrapApiResult } from '../core/utils/api-result';
import { AuthRoleService } from '../core/auth/auth-role.service';

interface LoginValue {
  user: string;
  accessToken: string;
  refreshToken: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private authRole = inject(AuthRoleService);

  private apiUrlLogin  = `${environment.apiBaseUrl}/Auth/login`;
  private apiUrlLogout = `${environment.apiBaseUrl}/Auth/logout`;

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<ApiResult<LoginValue>>(this.apiUrlLogin, { email, password })
      .pipe(
        unwrapApiResult<LoginValue>(),
        map(v => {
          // ✅ อัปเดต token ผ่าน AuthRoleService (กระตุ้น signal)
          this.authRole.setToken(v.accessToken);

          // เก็บ refresh / userId ตามต้องใช้
          localStorage.setItem('refresh_token', v.refreshToken);
          localStorage.setItem('id_user', v.user);

          return { token: v.accessToken };
        }),
        catchApiError()
      );
  }

  logout(userId: string, refreshToken: string): Observable<void> {
    return this.http.post<ApiResult<void>>(this.apiUrlLogout, { userId, refreshToken })
      .pipe(
        unwrapApiResult<void>(),
        map(() => {
          this.authRole.setToken(null);

          localStorage.removeItem('refresh_token');
          localStorage.removeItem('id_user');
        }),
        catchApiError()
      );
  }
}
