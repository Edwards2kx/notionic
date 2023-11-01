import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-modal-add-note',
  templateUrl: './modal-add-note.component.html',
  styleUrls: ['./modal-add-note.component.scss'],
})
export class ModalAddNoteComponent implements OnInit {

  // lo ideal es recibir un objeto task para editar o crear uno nuevo pero se presentaron problemas en el renderizado
  // donde la vista a pesar de crearse un nuevo objeto Task en el constructor informaba de un error, se decidio
  // generar variables independientes como "workArround" al no encontrar una solucion

  public task: Task;
  public title: string = "";
  public description: string = "";
  public dueTime: string;
  public isEditing: boolean = false;
  public isDone: boolean = false;
  public id: string = "";
  public timeNow: string;

  constructor(private modalCtrl: ModalController, private taskService: TaskService, private navParams: NavParams, private alertController: AlertController) {
    this.dueTime = this.timeNow = this.getCurrentDate();
    this.task = new Task({ title: "", description: "", dueTime: new Date().toISOString() });
    this.id = this.task.id;
  }

  ngOnInit() {
    const taskFromParams: Task | null = this.navParams.get('task');
    if (taskFromParams) {
      this.isEditing = true;
      this.id = taskFromParams.id,
        this.title = taskFromParams.title;
      this.description = taskFromParams.description;
      this.dueTime = taskFromParams.dueTime;
      this.isDone = taskFromParams.isDone;
      this.task = taskFromParams;
    }
  }


  private getCurrentDate() {
    const fechaActual = new Date(); // fecha en formato internacional
    const offsetMinutos = -300; // offset de 5 horas para hora colombiana
    fechaActual.setMinutes(fechaActual.getMinutes() + offsetMinutos);
    return fechaActual.toISOString();
  }

  public saveNote() {
    //validar que no haya campos vacios
    if (this.title.length < 3) {
      this.openAlertModal();
      return;
    } else {
      this.taskService.saveTask({ id: this.id, title: this.title, description: this.description, dueTime: this.dueTime, isDone: this.isDone, selected: false });
      return this.modalCtrl.dismiss(true, 'confirm');
    }
  }

  cancelNote() {
    return this.modalCtrl.dismiss(false, 'cancel');
  }

  private async openAlertModal() {
    const alert = await this.alertController.create({
      header: 'Datos incompletos',
      message: 'Por favor, llene el campo nombre en la tarea con más de 3 carácteres',
      buttons: ['OK']
    });

    await alert.present();
    return;
  }
}