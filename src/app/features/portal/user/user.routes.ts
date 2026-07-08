import { Routes } from '@angular/router';
import { authGuard } from '@core/auth/guards/auth.guard';

export const userRoutes: Routes = [
  {
    path: 'user',
    loadComponent: () => import('@features/portal/user/components/dashboard-layout/dashboard-layout.component')
      .then(m => m.DashboardLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('@features/portal/user/components/dashboard-overview/dashboard-overview.component')
          .then(m => m.DashboardOverviewComponent),
        title: 'Dashboard - Xtraction'
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            redirectTo: 'profile',
            pathMatch: 'full'
          },
          {
            path: 'profile',
            loadComponent: () => import('@features/portal/user/components/profile-settings/profile-settings.component')
              .then(m => m.ProfileSettingsComponent),
            title: 'Profile Settings - Xtraction'
          },
          {
            path: 'security',
            loadComponent: () => import('@features/portal/user/components/security-settings/security-settings.component')
              .then(m => m.SecuritySettingsComponent),
            title: 'Security Settings - Xtraction'
          },
          {
            path: 'billing',
            loadComponent: () => import('@features/portal/user/components/billing-settings/billing-settings.component')
              .then(m => m.BillingSettingsComponent),
            title: 'Billing & Subscription - Xtraction'
          },
          {
            path: 'billing/paystack/callback',
            loadComponent: () => import('@features/billing/payments/pages/paystack-callback/paystack-callback.component')
              .then(m => m.PaystackCallbackComponent),
            title: 'Payment Processing - Xtraction'
          },
          {
            path: 'notifications',
            loadComponent: () => import('@features/portal/user/components/notification-settings/notification-settings.component')
              .then(m => m.NotificationSettingsComponent),
            title: 'Notification Preferences - Xtraction'
          },
          {
            path: 'storage',
            loadComponent: () => import('@features/portal/user/components/storage-usage/storage-usage.component')
              .then(m => m.StorageUsageComponent),
            title: 'Storage & Usage - Xtraction'
          }
        ]
      }
    ]
  }
];
