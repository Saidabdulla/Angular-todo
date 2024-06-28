import { inject, Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { MessageService } from "primeng/api";
import { AuthService } from "../servies/auth.service";
import { LocalStorageService } from "../servies/local-storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);
  private messageService = inject(MessageService);
  private localStorageService = inject(LocalStorageService);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.localStorageService.getToken();

    if (accessToken) {
      const modifiedHeaders = request.headers.set('Authorization', `Token ${accessToken}`);

      const modifiedRequest = request.clone({
        headers: modifiedHeaders
      });

      return next.handle(modifiedRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          this.handleError(error);
          return throwError(() => error);
        })
      );
    } else {
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          this.handleError(error);
          return throwError(() => error);
        })
      );
    }
  }

  private handleError(error: HttpErrorResponse) {
    const baseError = {
      severity: 'error',
      summary: 'Error'
    }

    if (error.status === 400) {
      this.messageService.add({
        ...baseError,
        detail: 'Bad Request.'
      })
    }
    if (error.status === 404) {
      this.messageService.add({
        ...baseError,
        detail: 'Not Found.'
      })

    }
    if (error.status === 500) {
      this.messageService.add({
        ...baseError,
        detail: 'Server Error.'
      })
    }
    if (error.status === 409) {

      this.messageService.add({
        ...baseError,
        detail: 'Conflict with the current state of a resource.'
      })
    }
    if (error.status === 0) {
      this.messageService.add({
        ...baseError,
        detail: 'No response.'
      })
    }
    if (error.status === 401) {
      this.authService.logOut();
    }
  }
}
