import { Component, inject } from '@angular/core';
import { ModalController, RefresherCustomEvent } from '@ionic/angular';
import { ModalAddNoteComponent } from '../components/modal-add-note/modal-add-note.component';
import { MessageComponent } from '../message/message.component';

import { DataService, Message } from '../services/data.service';
import { TaskService } from '../services/task.service';

import { Task } from '../models/task';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  message = 'This modal example uses the modalController to present and dismiss modals.';
  private data = inject(DataService);
  private taskService = inject(TaskService)

  public filter = "pendiente";
  //public tasks;
  constructor(private modalCtrl: ModalController) {
    // this.tasks = this.taskService.getDummyTasks();
  }

  getTasks() : Task[] {
    let fechaActual = new Date();

    //console.log(fechaActual.toString())
      let allTasks = this.taskService.getDummyTasks();
    if (this.filter == "pendiente") {
      return allTasks.filter((v, i) =>  v.isDone === false );
    } else if (this.filter == "completada") {
      return allTasks.filter((v, i) =>  v.isDone === true );
    } else { //done
      //return this.tasks.filter((tarea) => tarea.deadline < fechaActual && !tarea.done);
      //return allTasks.filter ((v) => v.dueTime <  ); //calcular la fecha de vencimiento
       return [];
    }
  }


  async openModal(task?: Task) {
    const modal = await this.modalCtrl.create({
      component: ModalAddNoteComponent,
      componentProps: {
        task: task, // Pasa la tarea como un argumento al modal
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }

  cancelSelection() {

  }

  markAsCompleted() {
    
  }


  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }
  segmentChanged($event: any) {

  }
  addNoteBtnEvent() {

  }
}
