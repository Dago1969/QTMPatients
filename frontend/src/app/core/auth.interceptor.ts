import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

/**
 * Propaga Authorization Bearer e gli header di contesto selezionati in dashboard.
 */
export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  const selectedRole = authService.getSelectedRole();
  const selectedClient = authService.getSelectedClient();

  if (!token) {
    return next(request);
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`
  };

  if (selectedRole) {
    headers['X-Selected-Role'] = selectedRole;
  }

  if (selectedClient) {
    headers['X-Selected-Client'] = selectedClient;
  }

  return next(request.clone({ setHeaders: headers }));
};