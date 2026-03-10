import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth.service';
import { MessageKey, t } from './i18n/messages';
import { environment } from '../environments/environment';

interface MenuItem {
  labelKey: MessageKey;
  route: string;
}

/**
 * Shell applicativa con menu laterale e context info provenienti da QTMDashboard.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  readonly dashboardUrl = environment.dashboardUrl;

  readonly menuItems: MenuItem[] = [
    { labelKey: 'menu.patientsSearch', route: '/patients/search' },
    { labelKey: 'menu.patientsNew', route: '/patients/new' }
  ];

  constructor(private readonly authService: AuthService) {
    this.storeTokenFromQueryString();
  }

  translate(key: MessageKey): string {
    return t(key);
  }

  get username(): string | null {
    return this.authService.getName();
  }

  get preferredUsername(): string | null {
    return this.authService.getPreferredUsername();
  }

  get selectedRole(): string {
    return this.authService.getSelectedRole();
  }

  get selectedClient(): string {
    return this.authService.getSelectedClient();
  }

  private storeTokenFromQueryString(): void {
    const url = new URL(window.location.href);
    const token = url.searchParams.get('token');
    const role = url.searchParams.get('role');
    const client = url.searchParams.get('client');

    if (token) {
      this.authService.setToken(token);
      url.searchParams.delete('token');
    }

    if (role) {
      this.authService.setSelectedRole(role);
      url.searchParams.delete('role');
    }

    if (client) {
      this.authService.setSelectedClient(client);
      url.searchParams.delete('client');
    }

    if (token || role || client) {
      window.history.replaceState({}, document.title, url.toString());
    }
  }
}