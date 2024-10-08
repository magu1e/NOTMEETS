import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { BookingsComponent } from './pages/bookings/bookings.component'
import { ContainerLayoutComponent } from './shared/container-layout/container-layout.component';
import { BlankLayoutComponent } from './shared/blank-layout/blank-layout.component';
import { authGuard } from './guards/auth.guard';
import { UsersComponent } from './pages/users/users.component'
import { RoomsComponent } from './pages/rooms/rooms.component';
import { MyBookingsComponent } from './pages/my-bookings/my-bookings.component';

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
        path: 'my-bookings',
        component: MyBookingsComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'rooms',
        component: RoomsComponent,
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
