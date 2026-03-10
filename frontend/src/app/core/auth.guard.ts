import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

/**
 * Consente l'accesso solo se esiste un token valido, eventualmente letto dalla query string.
 */
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const currentUrl = new URL(window.location.href);
  const token = currentUrl.searchParams.get('token');
  const role = currentUrl.searchParams.get('role');
  const client = currentUrl.searchParams.get('client');

  if (token) {
    authService.setToken(token);
    currentUrl.searchParams.delete('token');
  }

  if (role) {
    authService.setSelectedRole(role);
    currentUrl.searchParams.delete('role');
  }

  if (client) {
    authService.setSelectedClient(client);
    currentUrl.searchParams.delete('client');
  }

  if (token || role || client) {
    window.history.replaceState({}, document.title, currentUrl.toString());
  }

  if (authService.isAuthenticated()) {
    return true;
  }

  window.location.href = environment.dashboardLoginUrl;
  return false;
};