import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // El router module lo exportamos para que pueda ser utilizado en cualquier otro módulo
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../guards/auth.guard';


const routes: Routes = [
    {
        path: 'dashboard', component: PagesComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        loadChildren: () => import('./child-routes.module').then( m => m.ChildRoutesModule )
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
