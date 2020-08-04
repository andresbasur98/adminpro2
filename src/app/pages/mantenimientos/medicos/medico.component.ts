import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from 'src/app/models/hospital.model';
import { MedicoService } from '../../../services/medico.service';
import Swal from 'sweetalert2';
import { Medico } from 'src/app/models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];

  public medicoSeleccionado: Medico;
  public hospitalSeleccionado: Hospital;

  constructor(private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { } // Activated route para obtener el id por la url


  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarMedico(id);
    });

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    })

    this.cargarHospitales()

    // Obtener los cambios del formulario del hospital
    this.medicoForm.get('hospital').valueChanges
      .subscribe(hospitalId => {
        this.hospitalSeleccionado = this.hospitales.find(h => h._id == hospitalId) // Encontrar el hospital con el respectivo id
      })
  }

  cargarMedico(id: string) {
    if(id == 'nuevo'){
      return;
    }
    this.medicoService.obtenerMedicoPorId(id)
    .pipe(
      delay(100) //Le damos un delay para que pueda cargar correctamente la imagen del hospital
    )
      .subscribe(medico => {

        if( !medico ){
          return this.router.navigateByUrl('/dashboard/medicos')
        }

        const { nombre, hospital: { _id } } = medico
        this.medicoSeleccionado = medico;
        this.medicoForm.setValue({ nombre, hospital: _id })
      })
  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales
      })
  }

  guardarMedico() {
    const { nombre } = this.medicoForm.value;
    if (this.medicoSeleccionado) {
      //actualizar
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      this.medicoService.actualizarMedico(data)
                  .subscribe(resp => {
                    Swal.fire('Actualizado', `Médico ${nombre} actualizado correctamente`, 'success')
                  })
    } else {
      //crear
      const { nombre } = this.medicoForm.value;
      this.medicoService.crearMedico(this.medicoForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Creado', `Médico ${nombre} creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);
        })
    }
  }

}
