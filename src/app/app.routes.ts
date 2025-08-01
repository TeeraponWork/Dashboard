import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/app',
        pathMatch: 'full',
    },
    {
        path: 'app',
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
                import('./pages/main-app/users/users').then(
                    (c) => c.Users
                ), 
            }
        ]
    },
];
