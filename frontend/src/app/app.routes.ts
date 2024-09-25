import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { BookingsComponent } from './pages/bookings/bookings.component'
import { ContainerLayoutComponent } from './shared/container-layout/container-layout.component';
import { BlankLayoutComponent } from './shared/blank-layout/blank-layout.component';
import { authGuard } from './guards/auth.guard';
import { AdminComponent } from './pages/admin/admin.component';

export const routes: Routes = [
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
    ],
  },
  {
    path: '',
    component: ContainerLayoutComponent,
    canActivateChild: [authGuard], // Protege todas las rutas hijas
    children: [
      {
        path: 'bookings',
        component: BookingsComponent,
      },
      {
        path: 'admin',
        component: AdminComponent,
      },
    ],
  },
  {
    path: '**', 
    redirectTo: '', // En URLs no encontradas redirige a login
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
