import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Todo } from "../../../../interfaces/todos";
import { environment } from "../../../../../environments/environment";
import { CommonModule } from "@angular/common";
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ListComponent implements OnInit {
  http = inject(HttpClient);

  todos: Todo[] = [];

  fetchTodos(): void {
    const url = `${environment.apiUrl}todo/`;

    this.http.get(url).pipe(
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
    ).subscribe((sortedArray: Todo[]) => {
      this.todos = sortedArray
    });
  }

  ngOnInit(): void {
    this.fetchTodos();
  }
}
