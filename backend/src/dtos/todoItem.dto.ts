export class TodoItemDto {
    id: string;
    label: string;
    description: string;
    priority: number;
    tag: string[];
    startDate: Date;
    endDate: Date;
    state: string;
    assignedTo: string;
  
    constructor(todoItem: any) {
      this.id = todoItem._id;
      this.label = todoItem.label;
      this.description = todoItem.description;
      this.priority = todoItem.priority;
      this.tag = todoItem.tag;
      this.startDate = todoItem.startDate;
      this.endDate = todoItem.endDate;
      this.state = todoItem.state;
      this.assignedTo = todoItem.assignedTo;
    }
  }
  