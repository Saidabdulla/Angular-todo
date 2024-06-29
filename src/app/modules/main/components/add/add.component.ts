import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { LoginCredentials } from "../../../../interfaces/auth";
import { AuthService } from "../../../../servies/auth.service";
import { TodoService } from "../../../../servies/todo.service";
import { Todo } from "../../../../interfaces/todos";
import { TooltipModule } from "primeng/tooltip";


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule
  ]
})
export class AddComponent {
  todoService = inject(TodoService);

  titleErrorMessage = '';

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    completed: new FormControl(false),
    user: new FormControl(1)
  });

  submit() {
    if (this.form.invalid && !this.form.get('title')?.value) {
      this.titleErrorMessage = 'Title is required!';

    } else {
      this.todoService.addTodo(this.form.value as Todo);
      this.form.get('title')?.reset()
    }
  }

}
