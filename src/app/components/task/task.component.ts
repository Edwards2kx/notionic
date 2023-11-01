import { Component, Input, OnInit, ViewChild } from '@angular/core';
//import { DatePipe } from '@angular/common';
import { Task } from 'src/app/models/task';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent  implements OnInit {
  @Input() task?: Task;
 
 
public pressOnProgress: boolean = false;

  //@ViewChild(IonModal) modal: IonModal;
  constructor() { }

  ngOnInit() {}
  // private clicSostenidoTimer: any;
  // private clicSostenidoDuracion = 300; 

  // iniciarClicSostenido(event: any, task:Task) {
  //   this.clicSostenidoTimer = setTimeout(() => {
  //     this.realizarAccionClicSostenido();
  //   }, this.clicSostenidoDuracion);
  //   console.log("clic sostenido sobre:", task);
  // }

  // detenerClicSostenido(task:Task) {
  //   if (this.clicSostenidoTimer) {
  //     clearTimeout(this.clicSostenidoTimer);
  //   }
  // }

  realizarAccionClicSostenido() {
    // Aquí puedes realizar la acción que desees cuando se detecte un clic sostenido en el ion-item.
    console.log('Clic sostenido detectado');
  }

  confirm() {}
  cancel() {}

  completar(any:any){}
  descartar(any:any){}
 
  onWillDismiss($event : any) {}
}
