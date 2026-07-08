import { Routes } from '@angular/router';
import { authGuard } from '@core/auth/guards/auth.guard';

export const subscriptionRoutes: Routes = [
  {
    path: 'subscriptions',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('@features/billing/subscription/pages/subscription-overview/subscription-overview.component')
          .then(m => m.SubscriptionOverviewComponent),
        title: 'Subscription Overview - Xtraction'
      },
      {
        path: 'plans',
        loadComponent: () => import('@features/billing/subscription/pages/plans-comparison/plans-comparison.component')
          .then(m => m.PlansComparisonComponent),
        title: 'Compare Plans - Xtraction'
      },
      {
        path: 'upgrade',
        loadComponent: () => import('@features/billing/subscription/pages/upgrade-plan/upgrade-plan.component')
          .then(m => m.UpgradePlanComponent),
        title: 'Upgrade Plan - Xtraction'
      }
    ]
  },
  // Keep old routes for backward compatibility
  {
    path: 'subscription',
    redirectTo: 'subscriptions',
    pathMatch: 'full'
  }
];
