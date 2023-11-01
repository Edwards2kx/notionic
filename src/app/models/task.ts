import { UUID } from "angular2-uuid";
export class Task {
    public id: string;
    public title: string;
    public description: string;
    public dueTime: string;
    public isDone: boolean;
    public selected: boolean;
    constructor({
        title,
        description,
        dueTime,
        isDone = false,
        id = UUID.UUID(),
        selected = false
    }: {
        title: string;
        description: string;
        dueTime: string;
        isDone?: boolean;
        id?: string;
        selected? : boolean
    }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueTime = dueTime;
        this.isDone = isDone;
        this.selected = selected
    }
}

