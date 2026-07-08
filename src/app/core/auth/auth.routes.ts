import { Routes } from '@angular/router';
import { SignupComponent } from '@core/auth/components/signup/signup.component';
import { LoginComponent } from '@core/auth/components/login/login.component';
import { GoogleCallbackComponent } from '@core/auth/components/google-callback/google-callback.component';
import { redirectIfAuthenticatedGuard } from '@core/auth/guards/redirect-if-authenticated.guard';

export const authRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [redirectIfAuthenticatedGuard],
    title: 'Sign In - Xtraction'
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [redirectIfAuthenticatedGuard],
    title: 'Create Account - Xtraction'
  },
  {
    path: 'google/callback',
    component: GoogleCallbackComponent,
    title: 'Completing Signup - Xtraction'
  },
  {
    path: 'verify-email',
    loadComponent: () => import('@core/auth/components/verify-email/verify-email.component').then(m => m.VerifyEmailComponent),
    title: 'Verify Email - Xtraction'
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('@core/auth/components/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
    title: 'Reset Password - Xtraction'
  },
  {
    path: 'reset-password',
    loadComponent: () => import('@core/auth/components/reset-password/reset-password.component').then(m => m.ResetPasswordComponent),
    title: 'Set New Password - Xtraction'
  }
];
