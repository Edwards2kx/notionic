import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Storage } from '@ionic/storage-angular';
import { Plugins } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';

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

  addTask(title: string, description: string, dueTime: string): void {
    const task = new Task({ title: title, description: description, dueTime: dueTime })
    console.log("se envio a guardar task");
    this.storage.set(task.id, JSON.stringify(task));

  }
  public delAllTask(tasks: Task[]) {
    tasks.forEach(task => this.delTask(task));
  }

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
  public async delTask(task: Task) {
    await this.storage.remove(task.id);
    this.cancelLocalNotification(task);
  }

  saveTask(task: Task): void {
    this.storage.set(task.id, JSON.stringify(task));
     this.scheduleLocalNotification(task);
    //reajustar la notificacion
  }

  // Método para programar notificaciones locales
  private scheduleLocalNotification(task: Task) {
    const notificationTime = new Date(task.dueTime);
    notificationTime.setMinutes(notificationTime.getMinutes() - 10);
    // Programa la notificación
    LocalNotifications.schedule({
      notifications: [
        {
          title: 'Tarea próxima: ' + task.title,
          body: 'Fecha de vencimiento: ' + task.dueTime,
          id: this.uuidToInt(task.id),
          schedule: { at: notificationTime },
        },
      ],
    });
  }
  private cancelLocalNotification(task: Task) {
    LocalNotifications.cancel({
      notifications: [
        { id: this.uuidToInt(task.id) }
      ]
    }).then(() => {
      // Notificación eliminada con éxito
    }).catch((error) => {
      // Ocurrió un error al intentar eliminar la notificación
    });
  }

  private uuidToInt(uuid: string) {
    const hash = uuid.split('-').join('');
    return parseInt(hash, 16);
  }
}