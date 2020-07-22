import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  intervalSubs: Subscription;

  constructor() {


    // this.retornaObservable().pipe(
    //   retry() // Va a seguir intentando el observable hasta que lo consiga. Se puede introducir la cantidad de veces que quiere intentarlo
    // ).subscribe(
    //   valor => console.log('Subs:', valor),
    //   (err) => console.warn('Error',err),
    //   () => console.info('Obs terminado')
    // )

   this.intervalSubs = this.retornaIntervalo().subscribe(console.log);
    // this.fibonachi();
   }

   ngOnDestroy(){
     this.intervalSubs.unsubscribe(); // Terminamos con el observable al abandonar la página dónde se carga
   }

  //  fibonachi(){
  //    var a = 0;
  //    var b = 1;

  //    while(b <= 50){
  //     var c = a + b;
  //     var a = b;
  //     var b = c;
  //     console.log(b);
  //   }
  //  }

   retornaIntervalo(): Observable<number>{
     return interval(1000)
              .pipe(
                map( valor => valor + 1),
                filter( valor => ( valor % 2 == 0 ? true: false)),
                // take(10)
              )

   }

   retornaObservable(): Observable<number>{
    let i = 0;

    return new Observable<number>( observer => {

     const intervalo = setInterval(()=>{

        i++;
        observer.next(i);

        if( i == 4){
          clearInterval( intervalo );
          observer.complete();
        }

        if( i == 2 ){
          observer.error('i llegó al valor de 2');
        }
      }, 1000)
    });


   }

}
