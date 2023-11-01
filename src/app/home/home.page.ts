import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, RefresherCustomEvent } from '@ionic/angular';
import { ModalAddNoteComponent } from '../components/modal-add-note/modal-add-note.component';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

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
  // obtiene las tareas para la vista de forma filtrada
  public getTasks(): Task[] {
    const fechaActual = this.getCurrentDate();
    if (this.filter == "pendiente") {
      return this.allTasks.filter((task) => task.isDone === false && task.dueTime > fechaActual);
    } else if (this.filter == "completada") {
      return this.allTasks.filter((task) => task.isDone === true);
    } else {
      return this.allTasks.filter((task) => task.dueTime < fechaActual && task.isDone === false);
    }
  }

  private getCurrentDate() {
    const fechaActual = new Date(); // fecha en formato internacional
    const offsetMinutos = -300; // offset de 5 horas para hora colombiana
    fechaActual.setMinutes(fechaActual.getMinutes() + offsetMinutos);
    return fechaActual.toISOString();
  }
  //accion para manejar el tap entre una accion de seleccion o una accion de ir a detalles de la tarea
  public tapAction(task: Task) {
    if (this.isOnMultiSelectionMode === true) {
      task.selected = !task.selected;
    } else {
      this.openModal(task);
    }
  }

  countSelectedTasks(): number {
    return this.allTasks.filter(task => task.selected).length;
  }

public editMarkedTask(){
  const selectedTask = this.allTasks.find((task) => task.selected === true);
  if (selectedTask) {
    this.openModal(selectedTask);
  } 
}

public addNewTask() {
  this.openModal();
}

  //llama al modal para agregar una nueva tarea o editar una existente
  private async openModal(task?: Task) {
    const modal = await this.modalCtrl.create({
      component: ModalAddNoteComponent,
      componentProps: {
        task: task,
      }
    });

    modal.present();
    const { data, role } = await modal.onWillDismiss();
    console.log(" se recibio en data", data);
    if (data === true) { //hubo cambios en las tareas
      this.loadTasks();
    }
  }

  //inicia modo de seleccion
  public startSelectionMode() {
    console.log("se inicio el modo seleccion");
    this.isOnMultiSelectionMode = true;
  }
  //cancela modo de seleccion
  public cancelSelectionMode() {
    this.isOnMultiSelectionMode = false;
    this.allTasks.forEach((t) => t.selected = false); //desmarca todas las tareas
  }

  //marca las tareas seleccionadas como completadas
  public markAsCompleted() {
    this.isOnMultiSelectionMode = false;
    const taskToComplete = this.allTasks.filter((task) => task.selected === true);
    this.taskService.markAsCompleted(taskToComplete);
    this.loadTasks();
  }

  //muestra dialogo de confirmación de accion borrar 
  async delAllMarkedTask() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar las tareas seleccionadas?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => { /* El usuario canceló la eliminación */ },
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

  // para formatear la fecha a un modo más amigable
  formatDate(dateTime: string): string {
    const taskDueTime = new Date(dateTime);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return taskDueTime.toLocaleDateString('es-ES', options);
  }
}
