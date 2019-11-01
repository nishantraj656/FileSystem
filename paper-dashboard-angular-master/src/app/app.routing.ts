import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

export const AppRoutes: Routes = [
   {
    path: '',
    component: AdminLayoutComponent,
   },
  {
    path: '**',
    redirectTo: ''
  }
]
