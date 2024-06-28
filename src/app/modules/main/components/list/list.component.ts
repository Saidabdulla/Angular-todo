import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Todo } from "../../../../interfaces/todos";
import { environment } from "../../../../../environments/environment";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ListComponent implements OnInit{
  http = inject(HttpClient);

  todos: Todo[] = [];

  fetchTodos(): void {
    const url = `${environment.apiUrl}todo/`;

    this.http.get(url).subscribe((res: any) => {
      this.todos = res.results;
    })
  }

  ngOnInit(): void {
    this.fetchTodos();
  }
}
