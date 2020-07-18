import { Component, OnInit } from '@angular/core';
// import { ChartType } from 'chart.js';
// import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

labels1: string[] = [
  'Jhony', 'Rambo','Ray'
];
data1 = [ 
  [230,150,300]
]

labels4: string[] = [
  'Lucas', 'Maxy','Tomyy'
];
data4 = [ 
  [111,222,322]
]

}
