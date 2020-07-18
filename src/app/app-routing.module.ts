import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // El router module lo exportamos para que pueda ser utilizado en cualquier otro módulo

// Modulos
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';


import { NopagefoundComponent } from './nopagefound/nopagefound.component';

const routes: Routes = [

  // path: '/dashboard' PagesRouting
  // path: '/auth' AuthRouting
 {path: '', redirectTo:'/dashboard', pathMatch: 'Full'},
 {path: '**', component: NopagefoundComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes), // Hay que importar las rutas
    PagesRoutingModule, // Importamos las rutas hijas,
    AuthRoutingModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
