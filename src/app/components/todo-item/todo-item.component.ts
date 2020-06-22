import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from '../model/Todo';
import { TodoServiceService} from '../../service/todo-service.service'

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;

  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService: TodoServiceService) { }

  ngOnInit() {
  }

  //set Dynamic classes
  setClasses() {
    let classes = {
      'todo': true,
      'is-complete': this.todo.completed
    }
    return classes;
  }

  onToggle(todo: Todo) {
    console.log('toggle');
    //Toggle in UI
    todo.completed = !todo.completed;
    //Toggle on server
    this.todoService.toggleCompleted(todo).subscribe(todo => {
      console.log(todo);
    });
  }

  onDelete(todo: Todo) {
    console.log('delete');
    this.deleteTodo.emit(todo);
  }

}
