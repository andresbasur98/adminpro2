import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Medico } from '../models/medico.model';


const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

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

  getMedicos(){
    let url = `${base_url}/medico`
    return this.http.get(url , this.headers)
                    .pipe(
                      map((resp:{ok: boolean, medicos: Medico[]}) => resp.medicos)
                    )

  }

  obtenerMedicoPorId(id: string){
    let url =`${base_url}/medico/${id}`;
    return this.http.get(url, this.headers)
                  .pipe(
                    map((resp: {ok: boolean,medico: Medico}) => resp.medico)
                  )
  } 

  crearMedico( medico:{nombre: string, hospital:string} ){
    let url = `${base_url}/medico`;
    return this.http.post(url, medico, this.headers);
  }

  actualizarMedico( medico: Medico ){
    let url = `${base_url}/medico/${medico._id}`;
    return this.http.put(url, medico , this.headers);
  }

  eliminarMedico( _id: string){
    let url = `${base_url}/medico/${_id}`;
    return this.http.delete(url, this.headers);
  }

}
