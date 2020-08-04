import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor(private hospitalService: HospitalService,
              private modalImagenService:ModalImagenService) { }

  ngOnInit(): void {
    this.cargarHospitales();
  }

  cargarHospitales(){
    this.cargando = true;
    this.hospitalService.cargarHospitales()
              .subscribe(hospitales => {
                this.cargando = false;
                this.hospitales = hospitales;
                this.hospitalesTemp = hospitales
                console.log(hospitales);
              })
  }

 guardarCambios( hospital: Hospital){
   this.hospitalService.actualizarHospital(hospital.nombre, hospital._id)
          .subscribe( resp => {
            Swal.fire('Actualizado', hospital.nombre, 'success')
          })
 }

 eliminarHospital( hospital: Hospital){
   this.hospitalService.eliminarHospital(hospital._id)
      .subscribe( resp => {
        this.cargarHospitales();
        Swal.fire('Borrado', hospital.nombre, 'success')
  })
 }

  async abrirSweetAlert(){
    const {value = ''} = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true
    })
    
    if( value.trim().length > 0 ){
      this.hospitalService.crearHospital(value)
            .subscribe( (resp: any) => {
              this.hospitales.push(resp.hospital)
            })
    }

 }

  abrirModal( hospital: Hospital){
      this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img)
      this.imgSubs = this.modalImagenService.nuevaImagen.subscribe( img => this.cargarHospitales());
     
  }

  buscarHospital(busqueda: string){

    if (busqueda.length == 0) {
      return this.hospitales = this.hospitalesTemp;
    }

    this.hospitalService.buscarHospital(busqueda)
          .subscribe( (resp: any) => {
             this.hospitales =  resp.resultados
          })
  }
}
