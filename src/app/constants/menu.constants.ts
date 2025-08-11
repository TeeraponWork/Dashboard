import { MenuItem } from "../interfaces/menu-item.interfaces";

export const MENU_ITEMS: MenuItem[] = [
    {
        label: 'Dashboard',
        icon: 'bi bi-house',
        route: 'dashboard',
        roles: ['User', 'Admin']
    },
    {
        label: 'User',
        icon: 'bi bi-people',
        route: 'users',
        roles: ['Admin']
    },
    {
        label: 'Report',
        icon: 'fas fa-chart-column',
        route: '',
        roles: ['Admin','User'],
        submenu:[
            {
                label: 'User Report',
                icon: 'bi bi-bar-chart-fill',
                route: 'user-report',
            },
            {
                label: 'Manager Report',
                icon: 'bi bi-bar-chart-fill',
                route: 'manager-report',
            }
        ]
    }
];