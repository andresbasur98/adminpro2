import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  constructor(public modalImagenService: ModalImagenService,
              public fileUploadService: FileUploadService) { }

  public imagenSubir: File;
  public imgTemp: any = null; // Para mostrar la imagen previa a subir

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
  }

  cambiarImagen(file: File) {
    this.imagenSubir = file;

    if (!file) {
      return this.imgTemp = null;
    }

    const reader = new FileReader(); // Vanilla Javascript, vamos a mostrar la imagen antes de subirla
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  subirImagen(){

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService.actualizarFoto(this.imagenSubir, tipo, id)
    .then( img => {
      Swal.fire('Éxito', 'Imagen subida con éxito', 'success');
      this.modalImagenService.nuevaImagen.emit(img);
      this.cerrarModal();
    })
    .catch( err =>{
      Swal.fire('Error', 'No se pudo subir la imagen', 'error')
    })
  }
}
