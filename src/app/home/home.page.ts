import { Component, inject, OnInit } from '@angular/core';
import { AlertController, ModalController, RefresherCustomEvent } from '@ionic/angular';
import { ModalAddNoteComponent } from '../components/modal-add-note/modal-add-note.component';

import { DataService, Message } from '../services/data.service';
import { TaskService } from '../services/task.service';

import { Task } from '../models/task';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  message = 'This modal example uses the modalController to present and dismiss modals.';
  private data = inject(DataService);
  public filter = "pendiente";
  public tasksLoaded = false;
  public allTasks: Task[] = [];
  public isOnMultiSelectionMode: boolean = false;

  public pressOnProgress: boolean = false;

  constructor(private modalCtrl: ModalController, private taskService: TaskService, private alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.loadTasks();
  }

  private loadTasks() {
    this.taskService.getTasks().then(
      (result) => {
        this.allTasks = result; // Establece las tareas cuando se cargan
        this.tasksLoaded = true; // Marca como cargadas
      }
    );
  }
  private clicSostenidoTimer: any;
  private clicSostenidoDuracion = 300;
  iniciarClicSostenido(event: any, task: Task) {
    this.clicSostenidoTimer = setTimeout(() => {
      //this.realizarAccionClicSostenido();
    }, this.clicSostenidoDuracion);
    console.log("clic sostenido sobre:", task);
  }

  detenerClicSostenido(task: Task) {
    if (this.clicSostenidoTimer) {
      clearTimeout(this.clicSostenidoTimer);
    }
  }

  public getTasks(): Task[] {
    let fechaActual = new Date().toISOString();
    if (this.filter == "pendiente") {
      return this.allTasks.filter((task) => task.isDone === false && task.dueTime > fechaActual);
    } else if (this.filter == "completada") {
      return this.allTasks.filter((task) => task.isDone === true);
    } else {
      return this.allTasks.filter((task) => task.dueTime < fechaActual && task.isDone === false);
    }
  }

  async openModal(task?: Task) {
    const modal = await this.modalCtrl.create({
      component: ModalAddNoteComponent,
      componentProps: {
        task: task,
      }
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    this.loadTasks(); //tratando de llamar las tareas una vez se cierre el modal;
    // if (role === 'confirm') {
    //   this.message = `Hello, ${data}!`;
    // }
  }

  segmentChanged() {
  }

  public cancelSelectionMode() {
    this.isOnMultiSelectionMode = false;
    this.allTasks.forEach((t) => t.selected = false); //desmarca todas las treas
  }

  public startSelectionMode() {
    this.isOnMultiSelectionMode = true;
  }

  public markAsCompleted() {
    this.isOnMultiSelectionMode = false;
    const taskToComplete = this.allTasks.filter((task) => task.selected === true);
    this.taskService.markAsCompleted(taskToComplete);
    this.loadTasks();
  }

  // public delAllMarkedTask() {
  //   this.isOnMultiSelectionMode = false;
  //   const taskToDelete = this.allTasks.filter((task) => task.selected === true);
  //    this.taskService.delAllTask(taskToDelete);
  //   this.loadTasks();
  // }


  // refresh(ev: any) {
  //   setTimeout(() => {
  //     (ev as RefresherCustomEvent).detail.complete();
  //   }, 3000);
  // }

  getMessages(): Message[] {
    return this.data.getMessages();
  }
  // segmentChanged($event: any) {

  // }

  addNoteBtnEvent() {

  }


  async delAllMarkedTask() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar las tareas seleccionadas?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            // El usuario canceló la eliminación, no hagas nada.
          },
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.isOnMultiSelectionMode = false;
            const taskToDelete = this.allTasks.filter((task) => task.selected === true);
            this.taskService.delAllTask(taskToDelete);
            this.loadTasks();
          },
        },
      ],
    });

    await alert.present();
  }




}
