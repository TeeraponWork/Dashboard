// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { canMatchAuth, canActivateRole } from './core/guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(c => c.Login),
  },
  {
        path: 'forbidden',
        loadComponent: () => import('./pages/forbidden/forbidden').then(c => c.Forbidden),
      },
  {
    path: 'app',
    canMatch: [canMatchAuth], // ✅ เช็คว่า "ล็อกอินแล้ว" เท่านั้น
    loadComponent: () =>
      import('./pages/portal-layout/portal-layout').then(c => c.PortalLayout),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/main-app/dashboard/dashboard').then(c => c.Dashboard),
      },

      {
        path: 'users',
        canActivate: [canActivateRole],       // ✅ เช็ค role เฉพาะเส้นนี้
        data: { roles: ['Admin'] },           // ✅ ต้องเป็น Admin
        loadComponent: () =>
          import('./pages/main-app/users/users').then(c => c.Users),
      },
    ],
  },
];
