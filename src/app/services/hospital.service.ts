import { Injectable } from '@angular/core';
import { Hospital } from '../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

 
  constructor(private http: HttpClient) { }
 
 
  get token(): string {
    return localStorage.getItem('token') || '';
  }             

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }
  cargarHospitales(desde:number = 0){
    let url = `${base_url}/hospitales`;
    return this.http.get(url, this.headers) //También podemos crear una interfaz para reducir la línea
              .pipe(
                map(
                  (resp: {ok: boolean, hospitales: Hospital[]}) => resp.hospitales
                )
              )
  }

  crearHospital( nombre: string ){
    let url = `${base_url}/hospitales`;
    return this.http.post(url, {nombre}, this.headers);
  }

  actualizarHospital( nombre: string, _id: string ){
    let url = `${base_url}/hospitales/${_id}`;
    return this.http.put(url, {nombre}, this.headers);
  }

  eliminarHospital( _id: string){
    let url = `${base_url}/hostitales/${_id}`;
    return this.http.delete(url, this.headers);
  }

  buscarHospital( busqueda: string){
    let url =  `${base_url}/todo/coleccion/hospitales/${busqueda}`;
    return this.http.get(url, this.headers);
  }


}
