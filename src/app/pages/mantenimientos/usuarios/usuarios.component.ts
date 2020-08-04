import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = []; //Los creamos para si al realizar una busqueda finalmente no buscamos a ninguno aparezcan de nuevo los que estaban y no se quede lo buscado

  public imgSubs: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;

  constructor(private usuarioService: UsuarioService,
    private busquedasService: BusquedasService,
    private modalImagenService:ModalImagenService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalImagenService.nuevaImagen.subscribe( img => this.cargarUsuarios());
  }

  ngOnDestroy(){
    this.imgSubs.unsubscribe();
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe(({ total, usuarios }) => {

        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      })
  }

  cambiarPagina(desde: number) {
    this.desde += desde;

    if (this.desde < 0) {
      this.desde = 0
    } else if (this.desde > this.totalUsuarios) {
      this.desde -= desde
    }

    this.cargarUsuarios();
  }

  buscar(termino: string) {
    if (termino.length == 0) {
      return this.usuarios = this.usuariosTemp;
    }

    this.busquedasService.buscar('usuarios', termino)
      .subscribe((resp: Usuario[]) => this.usuarios = resp)
  }

  eliminarUsuario(usuario: Usuario) {

    if( usuario.uid == this.usuarioService.usuario.uid){
      return Swal.fire('Error','No puede borrarse a si mismo', 'error');
    }

    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta apunto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
          this.usuarioService.eliminarUsuario(usuario)
                .subscribe( resp => {
                  Swal.fire('Usuario Borrado', `El usuario ${usuario.nombre} ha sido eliminado`,'success') 
                  this.cargarUsuarios();
                
                })
      }
    })
  }

  cambiarRole( usuario:Usuario){
    this.usuarioService.guardarUsuario( usuario )
        .subscribe()
  }

  abrirModal(usuario: Usuario){
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
  }
}
