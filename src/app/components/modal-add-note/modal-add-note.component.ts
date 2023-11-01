import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
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

  public name: string; //TODO: eliminar esta propiedad
  public task: Task;
  public title: string = "";
  public description: string = "";
  public dueTime: string;
  public isEditing: boolean = false;
  public timeNow: string;
  public isDone: boolean = false;
  public id: string = "";
  //public isDone: boolean = false;


  //public task: Task;
  //service: TaskService;

  constructor(private modalCtrl: ModalController, private taskService: TaskService, private navParams: NavParams) {
    this.dueTime = this.timeNow = new Date().toISOString();
    //console.log("dueTime", this.dueTime);
    //this.timeNow = new Date().toISOString();

    this.task = new Task({ title: "", description: "", dueTime: new Date().toISOString() });
    this.id = this.task.id;
    //console.log("se genero la tarea", this.task);
    
    //this.dueTime = new Date();
    //console.log("tengo el tiempo", this.timeNow);

    this.name = "nombre";
    //this.service = taskService;
  }

  cancelNote() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  // saveNote() {
  //   //agregar un alert que indique si los datos estan vacios
  //   //agregar un parametro opcional de id para cuando sea una edicion de tarea
  //   if (this.task) {
  //     //se crea una nueva tarea copiando el id y los elementos de la vista
  //     const copyTask = new Task({ id: this.task.id, title: this.title, description: this.description, isDone: this.isDone, dueTime: this.dueTime });
  //     //this.title,this.description,this.dueTime,this.isDone,this.task.id
  //     //this.taskService.saveTask(this.task);
  //     this.taskService.saveTask(copyTask);
  //     console.log("tarea guardada" + this.task);
  //     return this.modalCtrl.dismiss(this.name, 'confirm'); //TODO: borrar el elemento esperado
  //   } else {
  //     this.taskService.addTask(this.title, this.description, new Date(this.dueTime))
  //     return this.modalCtrl.dismiss(this.name, 'confirm'); //Todo borrar ese elemento name
  //   }
  // }

  saveNote() {
    //console.log("tarea recibida", this.task);

    //console.log(this.dueTime);
    this.taskService.saveTask({ id: this.id, title: this.title, description: this.description, dueTime: this.dueTime, isDone: this.isDone, selected: false });
    return this.modalCtrl.dismiss(this.name, 'confirm'); //TODO: borrar el elemento esperado
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

  // ngOnInit() {
  //   //this.task = this.navParams.get('task');
  //   const taskFromParams = this.navParams.get('task');
  //   if (taskFromParams) {
  //     this.task = taskFromParams;
  //     console.log(this.task)
  //     this.title = this.task.title;
  //     this.description = this.task.description;
  //     //this.dueTime = this.task.dueTime.toISOString();
  //     //this.dueTime = new Date(this.task.dueTime);
  //     this.dueTime = this.task.dueTime;
  //     this.isEditing = true;
  //   } else {
  //     this.task = new Task({title: "", description: "", dueTime : new Date()})
  //     console.log("no se recibio parametro task");
  //   }
  // }

}
