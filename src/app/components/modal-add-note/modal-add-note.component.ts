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

  //podrian llegar en el constructor
  public name: string; //TODO: eliminar esta propiedad
  public title: string = "";
  public description: string =  "";
  public dueTime: string;
  public task?: Task;
  public isEditing: boolean = false;
  //service: TaskService;

  constructor(private modalCtrl: ModalController, private taskService: TaskService, private navParams: NavParams) {
    this.dueTime = new Date().toISOString();
    this.name = "nombre";
    //this.service = taskService;
  }

  cancelNote() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  saveNote() {
    //agregar un alert que indique si los datos estan vacios
    //agregar un parametro opcional de id para cuando sea una edicion de tarea
    if(this.task){
      this.taskService.saveTask(this.task);
      console.log("tarea guardada" + this.task);
      return this.modalCtrl.dismiss(this.name, 'confirm'); //TODO: borrar el elemento esperado
    } else {
      this.taskService.addTask(this.title, this.description, new Date(this.dueTime))
    return this.modalCtrl.dismiss(this.name, 'confirm'); //Todo borrar ese elemento name
    }
  }

  

  ngOnInit() { 
  
    this.task = this.navParams.get('task');
    if(this.task){
      this.title = this.task.title;
      this.description = this.task.description;
      this.dueTime = this.task.dueTime.toISOString();
      this.isEditing = true;
    } else{
      console.log("no se recibio parametro task");
    }
  }

}
