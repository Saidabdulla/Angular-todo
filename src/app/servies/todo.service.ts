import { inject, Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { Todo } from "../interfaces/todos";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { BehaviorSubject } from "rxjs";
import { MessageService } from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  http = inject(HttpClient);
  messageService = inject(MessageService);

  private newTodoSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  onNewTodo() {
    return this.newTodoSubject.asObservable();
  }

  getTodos() {
    const url = `${environment.apiUrl}todo/`;

    return this.http.get(url).pipe(
      map((res: any) => {
        // Sort array with completed: false first, completed: true last
        return res.results.sort((a: Todo, b: Todo) => {
          if (a.completed === b.completed) {
            return 0;
          } else if (a.completed) {
            return 1;
          } else {
            return -1;
          }
        });
      })
    )
  }

  addTodo(todo: Todo) {
    const url = `${environment.apiUrl}todo/`;

    this.http.post(url, {
      title: todo.title,
      completed: todo.completed,
      user: todo.user
    }).subscribe(
      () => {
        this.newTodoSubject.next(true);

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Todo added successfully!'
        })
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message
        })
      }
    )
  }

  updateTodo(todo: Todo) {
    const url = `${environment.apiUrl}todo/${todo.id}/`;

    this.http.put(url, {
      ...todo,
      completed: !todo.completed
    }).subscribe(
      () => {
        this.newTodoSubject.next(true);

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Todo updated successfully!'
        })
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message
        })
      }
    )
  }

  deleteTodo(todo: Todo) {
    const url = `${environment.apiUrl}todo/${todo.id}/`;

    if (window.confirm('Are you sure, you want to delete this todo?')) {
      this.http.delete(url).subscribe(
        () => {
          this.newTodoSubject.next(true);

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Todo deleted successfull!'
          })
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message
          })
        }
      )
    }
  }
}
