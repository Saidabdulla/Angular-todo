import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from "../servies/local-storage.service";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const localStorageService = inject(LocalStorageService)
  const router = inject(Router)

  const accessToken = localStorageService.getToken();

  if (accessToken) {
    return true;
  }

  router.navigate(['login']);
  return false;
};

