import { Routes } from '@angular/router';
import { authGuard } from '@core/auth/guards/auth.guard';

export const documentRoutes: Routes = [
  {
    path: 'documents',
    loadComponent: () => import('@features/portal/user/components/dashboard-layout/dashboard-layout.component')
      .then(m => m.DashboardLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('@features/document-processing/management/components/documents-list/documents-list.component')
          .then(m => m.DocumentsListComponent),
        title: 'My Documents - Xtraction'
      },
      {
        path: 'upload',
        loadComponent: () => import('@features/document-processing/management/components/document-upload/document-upload.component')
          .then(m => m.DocumentUploadComponent),
        title: 'Upload Documents - Xtraction'
      },
      {
        path: 'collection/:collectionId',
        loadComponent: () => import('@features/document-processing/management/components/collection-detail/collection-detail.component')
          .then(m => m.CollectionDetailComponent),
        title: 'Collection - Xtraction'
      }
    ]
  }
];

