import { Component, OnInit } from '@angular/core';
import { rejects } from 'assert';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  //   const promesa = new Promise((resolve, reject) =>{
  //     if(false){
  //        resolve('Hola mundo');
  //     }else{
  //         reject('Algo salió mal');
  //     }

  //   });
    
  //   promesa.then( data => console.log(data)).catch( err => console.log(err))

  //   console.log('Fin del Init');
  this.getUsuarios().then(usuarios => console.log(usuarios))

   }

   getUsuarios(){

    return new Promise( resolve =>{
      fetch('https://reqres.in/api/users?page=2')
          .then(resp => resp.json())
          .then( body => resolve( body.data ))
    })

  
     
   }
}
