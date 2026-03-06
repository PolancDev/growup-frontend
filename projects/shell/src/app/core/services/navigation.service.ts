import { inject, Injectable } from '@angular/core';
import { MenuItem } from '../interfaces/general.interface';
import { AuthService } from './auth-service';
//import { studentRoutes } from '../../../../../features/pages/student/student.routes';
import { studentRoutes } from '../../utils/student.routes';
//import { routes } from '../../app.routes';
//import { teacherRoutes } from '../../../../../teacher/src/features/formador.routes';
import { teacherMenuMetadata } from '../../../../../teacher/src/features/formador.metadata';
import { adminRoutes } from '../../utils/admin.routes';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    authService = inject(AuthService);
    role = this.authService.userRole();

    // ... (studentMenu and formadorMenu logic)
    studentMenu: MenuItem[] = studentRoutes[0].children
        .filter(items => items.path !== '**')
        .filter(items => items.path !== '')
        .filter(items => items.title !== '')
        .map(route => ({
            label: route.title as string,
            icon: route.data?.['icon'] as string,
            route: `/private/student/${route.path || ''}`.replace(/\/$/, ''),
            roles: ['STUDENT']
        }));

    formadorMenu: MenuItem[] = teacherMenuMetadata
        .filter(items => items.path !== '**')
        .filter(items => items.path !== '')
        .filter(items => items.title !== '')
        .map(meta => ({
            label: meta.label,
            icon: meta.icon,
            route: `/private/teacher/${meta.path}`,
            roles: ['TEACHER']
        }));

    adminMenu: MenuItem[] = adminRoutes[0].children
        .filter(items => items.path !== '**')
        .filter(items => items.path !== '')
        .filter(items => items.title !== '')
        .map(route => ({
            label: route.title as string,
            icon: route.data?.['icon'] as string,
            route: `/private/admin/${route.path || ''}`.replace(/\/$/, ''),
            roles: ['ADMIN']
        }));

    private allMenuItems: MenuItem[] = [
        ...this.studentMenu,
        ...this.formadorMenu,
        ...this.adminMenu
    ]

    constructor() { }

    getMenuItems(role: string): MenuItem[] {
        const menuItem = this.allMenuItems.filter(item =>
            !item.roles || item.roles.includes(role)
        );
        return menuItem;
    }
}
