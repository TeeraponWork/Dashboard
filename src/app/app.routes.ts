import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then((c) => c.Login),
  },
  {
    path: 'app',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/portal-layout/portal-layout').then(
        (c) => c.PortalLayout
      ),
    children: [
      {
        path: '',
        redirectTo: '/app/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/main-app/dashboard/dashboard').then(
            (c) => c.Dashboard
          ),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./pages/main-app/users/users').then((c) => c.Users),
      },
    ],
  },
];
