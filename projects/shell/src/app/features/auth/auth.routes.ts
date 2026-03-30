import { Routes } from '@angular/router';
import { AuthLayout } from './auth-layout/auth-layout';
import { LoginComponent } from './pages/login-component/login-component';
import { RegisterComponent } from './pages/register-component/register-component';
import { ForgotComponent } from './pages/forgot-component/forgot-component';
import { CallbackComponent } from './pages/callback-component/callback-component';

export const authRoutes: Routes = [
    {
        path: '',
        component: AuthLayout,
        children: [
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: 'forgot',
                component: ForgotComponent
            },
            {
                path: 'callback',
                component: CallbackComponent
            },
        ]
    }
]
