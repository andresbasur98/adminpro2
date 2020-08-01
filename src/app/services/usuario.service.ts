import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap, map, catchError, delay } from 'rxjs/operators';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';


const base_url = environment.base_url; 

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone ) {
                this.googleInit();
               } 

  get token(): string {
    return localStorage.getItem('token') || '';
  }             

  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }
            
  googleInit() {
    return new Promise ( resolve => {
      gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '1049708885758-llk8g3u9q9hebup4fc3cjd8trcf8lsq8.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });

      resolve();
    });
    })
  
  }           

  logout(){
    localStorage.removeItem('token');
    
     
      this.auth2.signOut().then(() => {
        console.log('User signed out.'); 
        this.ngZone.run(() => {
          this.router.navigateByUrl('/login');
        }) 
      });
  
  }

  validarToken(): Observable<boolean>{
   
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map(
       ( resp: any )=>{
         const {   nombre,  email,  password,  google,  img,  role ,  uid   } = resp.usuario;
          this.usuario = new Usuario( nombre, email, '' , google, img || '', role, uid ); // Hay que hacer realizar una nueva instancia del usuario en caso de querer utilizar sus métodos
          localStorage.setItem('token', resp.token);
          return true;
        }),
        catchError( error => of(false))
    )
  }

  crearUsuario( formData: RegisterForm ){
    
    return this.http.post(`${base_url}/usuarios`, formData)
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token)
                  })
                )
  }

  actualizarPerfil( data: {email: string, nombre: string, role: string}){ //Se puede manejar asi la información que llega o también se puede crear una interfaz

    data = {
      ...data,
      role: this.usuario.role
    }

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data,{
      headers:{
        'x-token': this.token
      }
    })
  }

  login( formData: LoginForm ){
    return this.http.post(`${base_url}/login`, formData)
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token)
                  })
                )
  }

  loginGoogle ( token ){
    return this.http.post(`${base_url}/login/google`, {token})
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token)
                  })
                )
  }

  cargarUsuarios(desde:number = 0){
    let url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<{total:number, usuarios: Usuario[]}>(url, this.headers) //También podemos crear una interfaz para reducir la línea
                      .pipe( // Añadimos todo esto para poder mostrar la imagen en el avatar se puede hacer mediante un pipe también
                        delay(300), // Demoramos la respuesta 3 milisegundos para comprobar el icono loading
                        map( resp =>{
                          const usuarios = resp.usuarios.map( 
                            user => new Usuario(user.nombre, user.email,'', user.google, user.img,user.role, user.uid)
                            )
                          return {
                            total: resp.total,
                            usuarios
                          };
                        })
                      )
  }

  eliminarUsuario( usuario: Usuario){
    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete(url, this.headers);
  }

  guardarUsuario( usuario: Usuario){ //Se puede manejar asi la información que llega o también se puede crear una interfaz

    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers)
  }
}
