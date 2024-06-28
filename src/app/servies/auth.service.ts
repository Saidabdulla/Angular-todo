import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { LoginCredentials, LoginSuccessResponse } from "../interfaces/auth";
import { environment } from "../../environments/environment";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  router = inject(Router)
  http = inject(HttpClient);
  localStorageService = inject(LocalStorageService);

  loading = signal<boolean>(false);

  login(data: LoginCredentials) {
    this.loading.set(true);

    this.http
      .post<LoginSuccessResponse>(`${environment.apiUrl}auth/token/login`, data, {withCredentials: true})
      .subscribe(
        (data: LoginSuccessResponse) => {
          this.localStorageService.setToken(data);

          this.router.navigate([''])
        }, (error) => console.log(error))

  }

  logOut() {
    this.localStorageService.removeToken();
    this.router.navigate(['login']);
  }
}
