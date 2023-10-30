export class Task {
    id: string;
    title: string;
    description : string;
    dueTime : Date;
    //dueTime : string;
    //status: Status;
    isDone: boolean;
    
    //constructor (title : string, description: string, dueTime : string , status: Status = Status.Pendant) {
    //constructor (title : string, description: string, dueTime : string , isDone : boolean = false) {
    constructor (title : string, description: string, dueTime : Date , isDone : boolean = false) {
        this.id = title;
        this.title = title;
        this.description = description;
        this.dueTime = dueTime;
        //this.status = status
        this.isDone = isDone
    }
}
enum Status { Pendant, Done, outDate}
//enum pendiente, terminada, vencida
