import { Routes } from '@angular/router';
import { authGuard } from '@core/auth/guards/auth.guard';

export const creditRoutes: Routes = [
  {
    path: 'credits',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'packs',
        pathMatch: 'full'
      },
      {
        path: 'packs',
        loadComponent: () => import('@features/billing/credits/pages/credit-packs/credit-packs.component')
          .then(m => m.CreditPacksComponent),
        title: 'Credit Packs - Xtraction'
      },
      {
        path: 'transactions',
        loadComponent: () => import('@features/billing/credits/pages/credit-transactions/credit-transactions.component')
          .then(m => m.CreditTransactionsComponent),
        title: 'Credit Transactions - Xtraction'
      },
      {
        path: 'transfer',
        loadComponent: () => import('@features/billing/credits/pages/credit-transfer/credit-transfer.component')
          .then(m => m.CreditTransferComponent),
        title: 'Transfer Credits - Xtraction'
      },
      {
        path: 'purchase/callback',
        loadComponent: () => import('@features/billing/credits/pages/credit-purchase-callback/credit-purchase-callback.component')
          .then(m => m.CreditPurchaseCallbackComponent),
        title: 'Purchase Complete - Xtraction'
      }
    ]
  }
];

