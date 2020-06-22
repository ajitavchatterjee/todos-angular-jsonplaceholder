import { Component, OnInit } from '@angular/core';
import { Todo } from '../model/Todo';
import { importExpr } from '@angular/compiler/src/output/output_ast';
import { TodoServiceService} from '../../service/todo-service.service'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
todos: Todo[];
  constructor(private todoService: TodoServiceService) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  deleteTodo(todo: Todo) {
    console.log('delete me');
    this.todos = this.todos.filter(t => t.id != todo.id)
    this.todoService.deleteTodo(todo).subscribe();
  }

  addTodo(todo: Todo) {
      this.todoService.addTodo(todo).subscribe(todo =>{
        this.todos.push(todo)
      })
  }

}
