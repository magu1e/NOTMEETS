import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AdministrationComponent } from './pages/administration/administration.component';
import { ContainerLayoutComponent } from './shared/container-layout/container-layout.component';
import { BlankLayoutComponent } from './shared/blank-layout/blank-layout.component';
import { authGuard } from './guards/auth.guard';

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
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'administration',
        component: AdministrationComponent,
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
