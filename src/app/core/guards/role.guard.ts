import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router, UrlTree } from '@angular/router';
import { AuthRoleService } from '../auth/auth-role.service';

function checkRoles(required: string[] | undefined): boolean | UrlTree {
  const auth = inject(AuthRoleService);
  const router = inject(Router);

  if (!auth.isLoggedIn) return router.parseUrl('/login');   // ต้องล็อกอินก่อน

  if (!required || required.length === 0) return true;      // ไม่มี roles ก็ผ่าน

  const ok = auth.roles.some(r => required.includes(r));    // มี role ใด role หนึ่ง
  return ok ? true : router.parseUrl('/forbidden');
}

export const canActivateRole: CanActivateFn = (route) => {
  const required = route.data?.['roles'] as string[] | undefined;
  return checkRoles(required);
};

export const canMatchRole: CanMatchFn = (route) => {
  const required = route.data?.['roles'] as string[] | undefined;
  return checkRoles(required);
};

// ✅ เพิ่ม auth guard สำหรับเช็คว่า "ล็อกอินไหม" (ไม่เช็ค role)
export const canMatchAuth: CanMatchFn = () => {
  const auth = inject(AuthRoleService);
  const router = inject(Router);
  return auth.isLoggedIn ? true : router.parseUrl('/login');
};
