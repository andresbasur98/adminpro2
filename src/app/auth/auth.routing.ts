import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // El router module lo exportamos para que pueda ser utilizado en cualquier otro módulo
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path:'', redirectTo: '/dashboard', pathMatch: 'full' }
       
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
export class AuthRoutingModule { }
