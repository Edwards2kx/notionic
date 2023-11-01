import { Injectable, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class TaskService {



  public tasks: Task[];

  constructor(private storage: Storage) {
    this.tasks = [];
    this.initializeStorage();
  }
  private async initializeStorage() {
    await this.storage.create();
  }


  // async ngOnInit() {
  //   console.log("se llamo el ngOnInit");
  //   await this.storage.create();

  // }
  // async getTasks(): Promise<Task[]> {
  //   console.log("get task called")
  //   const rawTask = await this.storage.get("all-tasks")
  //   //const rawTask = await this.storage.get
  //   console.log(rawTask);
  //   if (rawTask) {
  //     return JSON.parse(rawTask);
  //   } else return [];
  // }


  async getTasks(): Promise<Task[]> {
    const tasks: Task[] = [];
    const keys = await this.storage.keys(); //se obtienen todas las keys de las tareas 
    console.log("se encontraron las keys:");
    console.log(keys);

    for (const key of keys) {
      const rawTask = await this.storage.get(key);
      const task: Task = JSON.parse(rawTask);
      tasks.push(task);
    }
    return tasks;
  }

  //guardamos las tareas dummy
  // const savedTasks = await this.storage.set("all-tasks", JSON.stringify(this.getDummyTasks()))
  // if (savedTasks) {
  //   console.log("resultado de guardar positivo ")
  //   console.log(savedTasks);
  // } else {
  //   console.log("resultado de guardar negativo ")
  //   console.log(savedTasks);
  // }


  addTask(title: string, description: string, dueTime: string): void {
    const task = new Task({ title: title, description: description, dueTime: dueTime })
    console.log("se envio a guardar task");
    this.storage.set(task.id, JSON.stringify(task));
  }



  // public delAllTask() : void{
  //   this.tasks.forEach(task => {
  //     if ( task.selected === true){
  //       this.delTask(task);
  //     }
  //   });
  // }

  // public delAllTask(tasks : Task[]){
  //   this.tasks.forEach(task => {//borrar linea
  //     if ( task.selected === true){ //borrar linea
  //       this.delTask(task);
  //     }  //borrar linea
  //   });
  // }
  public delAllTask(tasks: Task[]) {
    tasks.forEach(task => this.delTask(task));
  }


  // markAsCompleted(tasks:Task[]) {
  //   tasks.forEach(task => {
  //     task.isDone = true;
  //     this.saveTask(task);
  //   });
  // }

  //las tareas seleccionadas son marcadas como completadas y se almacena en el storage
  markAsCompleted(tasks: Task[]) {
    tasks.forEach(task => {
      if (task.selected === true) {
        task.selected = false; //para guardar en storage sin marcar
        task.isDone = true;
        this.saveTask(task);
      }
    });
  }
  // markAsCompleted() { 
  //   console.log('estoy en proceso de marcado completo')
  //   this.tasks.forEach(task => {
  //     if ( task.selected === true){
  //       console.log("esta tarea esta marcada para completar", task)
  //       task.isDone = true;
  //       this.saveTask(task);
  //     }
  //   });
  // }

  public async delTask(task: Task) {
    await this.storage.remove(task.id);
  }

  saveTask(task: Task): void {
    this.storage.set(task.id, JSON.stringify(task));
  }

  // getDummyTasks() {

  //   // id: string;
  //   // title: string;
  //   // description : string;
  //   // dueTime : string;
  //   // status: Status;
  //   return [...this.tasks,
  //   new Task("titulo1", "Descripcion1", new Date("2023-10-27T12:00:00"), true),
  //   new Task("titulo2", "Descripcion2", new Date("2023-10-27T12:00:00"), true),
  //   new Task("titulo3", "Descripcion3", new Date("2023-10-27T12:00:00"), false),
  //   new Task("titulo4", "Descripcion4", new Date("2023-10-30T12:00:00"), false),
  //   new Task("titulo5", "Descripcion5", new Date("2023-10-30T12:00:00"), true),
  //   new Task("titulo6", "Descripcion6", new Date("2023-10-30T12:00:00"), true),
  //   ];
  // }
}