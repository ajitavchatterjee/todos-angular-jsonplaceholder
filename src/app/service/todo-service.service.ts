import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Todo } from '../components/model/Todo'
import { Observable } from 'rxjs';

//Declare headers for PUT request
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  todosUrl: string = 'https://jsonplaceholder.typicode.com/todos';
  todosLimit: string = '?_limit=5';

  constructor(private http:HttpClient) { }

  //Get Todos
  getTodos(): Observable<Todo[]> {
   return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`);
  }

  //Toggle Completed
  toggleCompleted(todo: Todo) : Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`
    return this.http.put<Todo>(url, todo, httpOptions)
  }

  //Delete Todo from server
  deleteTodo(todo: Todo) : Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`
    return this.http.delete<Todo>(url, httpOptions);
  }

  //Add Todo to service
  addTodo(todo: Todo) : Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }

}
