export class UserDto {
    id: string;
    pseudo: string;
    mail: string;
    todoItems: string[];
  
    constructor(user: any) {
      this.id = user._id;
      this.pseudo = user.pseudo;
      this.mail = user.mail;
      this.todoItems = user.todoItems || [];
    }
  }
  