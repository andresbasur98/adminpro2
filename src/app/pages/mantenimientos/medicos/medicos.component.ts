import { Component, OnInit, OnDestroy } from '@angular/core';
import { Medico } from '../../../models/medico.model';
import { MedicoService } from '../../../services/medico.service';
import { Subscription } from 'rxjs';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit, OnDestroy {
 
 public cargando: boolean;  
 public medicos: Medico[] = [];
 private imgSubs: Subscription;

  constructor( private medicoService: MedicoService,
                private msService: ModalImagenService,
                private busquedaService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarMedicos()
    this.imgSubs = this.msService.nuevaImagen.pipe(
                      delay(100)
                    ).subscribe( img => this.cargarMedicos());

  }

  ngOnDestroy(){
    this.imgSubs.unsubscribe()
  }

  cargarMedicos(){
    this.cargando = true
    this.medicoService.getMedicos()
            .subscribe(medicos =>{
              console.log(medicos);
               this.medicos = medicos
               this.cargando = false
              })
  }

  buscarMedico(termino: string){

    if( termino.length === 0){
      return this.cargarMedicos()
    }

    this.busquedaService.buscar('medicos', termino)
            .subscribe( (resp:Medico[]) => this.medicos = resp)
  }

  abrirModal(medico: Medico){
    this.msService.abrirModal('medicos',medico._id, medico.img);
  }

  borrarMedico(medico: Medico){
    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta apunto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
          this.medicoService.eliminarMedico(medico._id)
                .subscribe( resp => {
                  Swal.fire('Medico Borrado', `El medico ${medico.nombre} ha sido eliminado`,'success') 
                  this.cargarMedicos();
                
                })
      }
    })
  }
}
