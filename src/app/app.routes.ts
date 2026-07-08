import { Routes } from '@angular/router';
import { LandingComponent } from '@features/public/landing-page/components/landing.component';
import { authGuard } from '@core/auth/guards/auth.guard';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: LandingComponent },
  // Backward-compatible redirects for old /dashboard paths
  { path: 'dashboard', redirectTo: '/user/dashboard', pathMatch: 'full' },
  { path: 'settings', redirectTo: '/user/settings', pathMatch: 'prefix' },
  {
    path: 'auth',
    loadChildren: () => import('@core/auth/auth.routes').then(m => m.authRoutes)
  },
  {
    path: '',
    loadChildren: () => import('@features/public/privacy/privacy.routes').then(m => m.privacyRoutes)
  },
  {
    path: '',
    loadChildren: () => import('@features/portal/user/user.routes').then(m => m.userRoutes)
  },
  {
    path: '',
    loadChildren: () => import('@features/document-processing/management/documents.routes').then(m => m.documentRoutes)
  },
  {
    path: '',
    loadChildren: () => import('@features/document-processing/ocr/ocr.routes').then(m => m.ocrRoutes)
  },
  {
    path: '',
    loadChildren: () => import('@features/billing/subscription/subscription.routes').then(m => m.subscriptionRoutes)
  },
  {
    path: '',
    loadChildren: () => import('@features/billing/payments/payments.routes').then(m => m.paymentRoutes)
  },
  {
    path: '',
    loadChildren: () => import('@features/billing/credits/credits.routes').then(m => m.creditRoutes)
  },
  {
    path: '',
    loadChildren: () => import('@features/portal/teams/teams.routes').then(m => m.teamRoutes)
  },
  {
    path: 'search',
    loadComponent: () => import('@features/portal/user/components/dashboard-layout/dashboard-layout.component')
      .then(m => m.DashboardLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('@shared/components/search/search.component')
          .then(m => m.SearchComponent),
        title: 'Search - Xtraction'
      }
    ]
  },
  {
    path: 'notifications',
    loadChildren: () => import('@features/portal/notifications/notifications.routes').then(m => m.notificationRoutes),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '/home' }
];
