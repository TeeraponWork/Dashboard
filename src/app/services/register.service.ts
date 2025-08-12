import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResult, catchApiError, unwrapApiResult } from '../core/utils/api-result';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  private http = inject(HttpClient);

  private apiUrl  = `${environment.apiBaseUrl}/Auth/register`;

  register(email: string, password: string, confirmPassword: string): Observable<RegisterValue> {
    return this.http.post<ApiResult<RegisterValue>>(this.apiUrl, { email, password, confirmPassword })
      .pipe(
        unwrapApiResult<RegisterValue>(),
        map((result) => {
            return result;
        }),
        catchApiError()
      );
  }
}
