import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Todo } from "../../../../interfaces/todos";
import { CommonModule } from "@angular/common";
import { TodoService } from "../../../../servies/todo.service";
import { SkeletonModule } from 'primeng/skeleton';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [CommonModule, SkeletonModule]
})
export class ListComponent implements OnInit {
  http = inject(HttpClient);
  todoService = inject(TodoService);

  todos: Todo[] = [];

  isTodoLoading = signal(false);

  ngOnInit(): void {
    this.fetchTodos();

    this.todoService.onNewTodo().subscribe((isNewTodoAdded: boolean) => {
      if (isNewTodoAdded) {
        this.fetchTodos();
      }
    })
  }

  fetchTodos(): void {
    this.isTodoLoading.set(true);

    this.todoService.getTodos().subscribe((sortedArray: Todo[]) => {
      this.todos = sortedArray

      this.isTodoLoading.set(false);
    });
  }


  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo);
  }
}
