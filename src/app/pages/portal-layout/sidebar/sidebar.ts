import { Component, inject, signal } from '@angular/core';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';

import { MenuItem } from '../../../interfaces/menu-item.interfaces';
import { MENU_ITEMS } from '../../../constants/menu.constants';
import { AuthRoleService } from '../../../core/auth/auth-role.service';

@Component({
  selector: 'app-sidebar',
  imports: [OverlayscrollbarsModule, RouterLink, RouterLinkActive, NgClass],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  private auth = inject(AuthRoleService);
  rolesUser = this.auth.rolesSig;

  menuItems = signal<MenuItem[]>(MENU_ITEMS);
  activeMenu = signal<string | null>(null);

  toggleMenu(label: string | undefined) {
    this.activeMenu.set(this.activeMenu() === label ? null : label ?? '');
  }

  canSee(item?: MenuItem | null): boolean {
    if (!item) return false;
    if (!item.roles || item.roles.length === 0) return true;   
    const userRoles = this.rolesUser(); 
    return item.roles.some(role => userRoles.includes(role));
  }
}
