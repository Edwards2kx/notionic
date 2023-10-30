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
  //@ViewChild(IonModal) modal: IonModal;
  constructor() { }

  ngOnInit() {}
  private clicSostenidoTimer: any;
  private clicSostenidoDuracion = 1000; 

  iniciarClicSostenido(event: any) {
    this.clicSostenidoTimer = setTimeout(() => {
      this.realizarAccionClicSostenido();
    }, this.clicSostenidoDuracion);
  }

  detenerClicSostenido() {
    if (this.clicSostenidoTimer) {
      clearTimeout(this.clicSostenidoTimer);
    }
  }

  realizarAccionClicSostenido() {
    // Aquí puedes realizar la acción que desees cuando se detecte un clic sostenido en el ion-item.
    console.log('Clic sostenido detectado');
  }

  confirm() {}
  cancel() {}
 
  onWillDismiss($event : any) {}
}
