import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject( AuthService )
  const router = inject( Router )
  const url = state.url;

  if(authService.authStatus() === AuthStatus.authenticated){
    return true;
  }
  if(authService.authStatus() === AuthStatus.checking){
    return false;
  }

  localStorage.setItem('url', url)
  router.navigateByUrl('/login')

  return false;

};
