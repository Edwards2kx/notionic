import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: Task[];
  // constructor(private storage: Storage){
  //   this.tasks = [];
  // }

  constructor(){
    this.tasks = [];
  }
  // async ngOnInit() {
  //   await this.storage.create();
  // }


  addTask(title: string, description: string, dueTime: Date): void {
    const task = new Task(title, description, dueTime);
    this.tasks.push(task);
    //console.log(this.tasks);
  }



  getTasks(): Task[] {
    return this.tasks;
  }

  delTask(task: Task | Task[]): void {
    //encontrar el elemento en la lista
    //hacer un split
    //guardar la nueva lista
    //this.tasks.splice()
  }

  saveTask(task: Task): void {

  }

  getDummyTasks() {

    // id: string;
    // title: string;
    // description : string;
    // dueTime : string;
    // status: Status;
    return [...this.tasks,
    new Task("titulo1", "Descripcion1", new Date("2023-10-27T12:00:00"), true),
    new Task("titulo2", "Descripcion2", new Date("2023-10-27T12:00:00"), true),
    new Task("titulo3", "Descripcion3", new Date("2023-10-27T12:00:00"), false),
    new Task("titulo4", "Descripcion4", new Date("2023-10-30T12:00:00"), false),
    new Task("titulo5", "Descripcion5", new Date("2023-10-30T12:00:00"), true),
    new Task("titulo6", "Descripcion6", new Date("2023-10-30T12:00:00"), true),
    ];



  }
}