import { OperatorFunction, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface ApiResult<T> {
  isSuccess: boolean;
  value: T | null;
  error: { code?: string; message?: string } | null;
}

export function unwrapApiResult<T>(): OperatorFunction<ApiResult<T>, T> {
  return map((res: ApiResult<T>) => {
    if (res?.isSuccess && res?.value != null) {
      return res.value;
    }
    const msg = res?.error?.message || 'Operation failed';
    throw new Error(msg);
  });
}

export function catchApiError<T>(): OperatorFunction<T, T> {
  return catchError((err: any) => {
    const msg =
      err?.error?.error?.message ??
      err?.error?.message ??
      err?.message ??
      'Unexpected error';
    return throwError(() => new Error(msg));
  });
}
