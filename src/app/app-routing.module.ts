import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // El router module lo exportamos para que pueda ser utilizado en cualquier otro módulo
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
 {
   path: '', component: PagesComponent,
   children: [
    {path:'dashboard', component: DashboardComponent},
    {path:'progress', component: ProgressComponent},
    {path:'grafica1', component: Grafica1Component},
    {path:'', redirectTo: '/dashboard', pathMatch: 'full'},
   ]
  },
 {path:'register', component: RegisterComponent},
 {path:'login', component: LoginComponent},

 {path: '**', component: NopagefoundComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes) // Hay que importar las rutas
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
