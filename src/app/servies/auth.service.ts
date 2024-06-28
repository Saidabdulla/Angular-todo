import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { LoginCredentials, LoginSuccessResponse } from "../interfaces/auth";
import { environment } from "../../environments/environment";
import { LocalStorageService } from "./local-storage.service";
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  router = inject(Router)
  http = inject(HttpClient);
  localStorageService = inject(LocalStorageService);
  messageService = inject(MessageService);

  loading = signal<boolean>(false);

  login(data: LoginCredentials) {
    this.loading.set(true);

    this.http
      .post<LoginSuccessResponse>(`${environment.apiUrl}auth/token/login/`, data, {withCredentials: true})
      .subscribe(
        (data: LoginSuccessResponse) => {
          this.localStorageService.setToken(data);

          this.loading.set(false);

          this.messageService.add({
            severity: 'success',
            summary: 'Login success!',
            detail: `Welcome back to board, Captain!`
          })

          this.router.navigate([''])
        }, (error) => {
          if (error instanceof HttpErrorResponse) {
            this.loading.set(false);

            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.error.message
            });
          }
        })

  }

  logOut() {
    this.localStorageService.removeToken();
    this.router.navigate(['login']);
  }
}
