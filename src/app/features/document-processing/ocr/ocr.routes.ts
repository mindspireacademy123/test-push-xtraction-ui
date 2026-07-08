import { Routes } from '@angular/router';
import { authGuard } from '@core/auth/guards/auth.guard';

export const ocrRoutes: Routes = [
  {
    path: 'ocr',
    loadComponent: () => import('@features/portal/user/components/dashboard-layout/dashboard-layout.component')
      .then(m => m.DashboardLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('@features/document-processing/ocr/components/ocr-processing/ocr-processing.component')
          .then(m => m.OcrProcessingComponent),
        title: 'OCR Processing - Xtraction'
      }
    ]
  }
];

