import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // El router module lo exportamos para que pueda ser utilizado en cualquier otro módulo
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
    {
        path: 'dashboard', component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
         {path:'', component: DashboardComponent, data: {titulo: 'Dashboard'}},
         {path:'perfil', component: PerfilComponent, data: {titulo: 'Perfil del Usuario'}},
         {path:'progress', component: ProgressComponent, data: {titulo: 'ProgressBar'}},
         {path:'grafica1', component: Grafica1Component, data: {titulo: 'Grafica'}},
         {path:'account-settings', component: AccountSettingsComponent, data: {titulo: 'Account Settings'}},
         {path:'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
         {path:'rxjs', component: RxjsComponent, data: {titulo: 'rxjs'}}
        ]
       },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes) // Hay que importar las rutas
  ],
  exports: [
    RouterModule
  ]
})
export class PagesRoutingModule { }
