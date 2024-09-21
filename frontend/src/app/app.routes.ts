import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AdministrationComponent } from './pages/administration/administration.component';
import { ContainerLayoutComponent } from './shared/container-layout/container-layout.component';
import { BlankLayoutComponent } from './shared/blank-layout/blank-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: ContainerLayoutComponent, //Layout con .container
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'adminitration', component: AdministrationComponent },
    ]
  },
  {
    path: '',
    component: BlankLayoutComponent, //Layout sin .container
    children: [
      { path: 'login', component: LoginComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }