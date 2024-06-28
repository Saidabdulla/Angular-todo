import { Injectable } from '@angular/core';
import { LoginSuccessResponse } from "../interfaces/auth";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getItem(key: string) {
    const item = localStorage.getItem(key);

    return item ? JSON.parse(item) : null;
  }

  setItem(key: string, data: any): void {
    const item = JSON.stringify(data);

    localStorage.setItem(key, item);
  }

  setToken(data: LoginSuccessResponse) {
    localStorage.setItem('token', data.token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
  }
}
