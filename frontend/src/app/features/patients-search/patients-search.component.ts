import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { MessageKey, t } from '../../i18n/messages';

interface PatientSummary {
  id: number;
  assistedId?: string;
  firstName?: string;
  lastName?: string;
  fiscalCode?: string;
  email?: string;
  structureId?: number;
}

interface PatientSearchFilters {
  assistedId: string;
  firstName: string;
  lastName: string;
  email: string;
  fiscalCode: string;
  structureId: string;
}

/**
 * Pagina di ricerca pazienti con accesso a visualizzazione e modifica.
 */
@Component({
  selector: 'app-patients-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="page-card">
      <header class="page-header">
        <div>
          <h2>{{ translate('patients.search.title') }}</h2>
          <p>{{ translate('search.filters') }}</p>
        </div>
        <button type="button" class="primary-btn" (click)="openNew()">{{ translate('crud.actions.new') }}</button>
      </header>

      <div *ngIf="message" class="message-box" [class.message-box-error]="messageType === 'error'">
        {{ message }}
      </div>

      <form class="filters-grid" (ngSubmit)="search()">
        <label>
          <span>{{ translate('patients.field.assistedId') }}</span>
          <input [(ngModel)]="filters.assistedId" name="assistedId" type="text" />
        </label>

        <label>
          <span>{{ translate('patients.field.firstName') }}</span>
          <input [(ngModel)]="filters.firstName" name="firstName" type="text" />
        </label>

        <label>
          <span>{{ translate('patients.field.lastName') }}</span>
          <input [(ngModel)]="filters.lastName" name="lastName" type="text" />
        </label>

        <label>
          <span>{{ translate('patients.field.email') }}</span>
          <input [(ngModel)]="filters.email" name="email" type="text" />
        </label>

        <label>
          <span>{{ translate('patients.field.fiscalCode') }}</span>
          <input [(ngModel)]="filters.fiscalCode" name="fiscalCode" type="text" />
        </label>

        <label>
          <span>{{ translate('patients.field.structureId') }}</span>
          <input [(ngModel)]="filters.structureId" name="structureId" type="number" />
        </label>

        <div class="actions-row">
          <button type="submit" class="primary-btn">{{ translate('crud.actions.search') }}</button>
          <button type="button" class="secondary-btn" (click)="reset()">{{ translate('crud.actions.reset') }}</button>
        </div>
      </form>

      <section class="results-section">
        <h3>{{ translate('search.results') }}</h3>

        <table class="results-table" *ngIf="results.length > 0; else emptyState">
          <thead>
            <tr>
              <th>{{ translate('common.id') }}</th>
              <th>{{ translate('patients.field.assistedId') }}</th>
              <th>{{ translate('patients.field.firstName') }}</th>
              <th>{{ translate('patients.field.lastName') }}</th>
              <th>{{ translate('patients.field.fiscalCode') }}</th>
              <th>{{ translate('patients.field.email') }}</th>
              <th>{{ translate('search.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let patient of results">
              <td>{{ patient.id }}</td>
              <td>{{ patient.assistedId || '-' }}</td>
              <td>{{ patient.firstName || '-' }}</td>
              <td>{{ patient.lastName || '-' }}</td>
              <td>{{ patient.fiscalCode || '-' }}</td>
              <td>{{ patient.email || '-' }}</td>
              <td class="table-actions">
                <button type="button" class="secondary-btn" (click)="openView(patient.id)">{{ translate('search.action.view') }}</button>
                <button type="button" class="primary-btn" (click)="openEdit(patient.id)">{{ translate('search.action.edit') }}</button>
              </td>
            </tr>
          </tbody>
        </table>

        <ng-template #emptyState>
          <p class="empty-state">{{ translate('search.noResults') }}</p>
        </ng-template>
      </section>
    </section>
  `,
  styles: [
    `
      .page-card { background: #fff; border-radius: 18px; padding: 24px; box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08); }
      .page-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 20px; }
      .page-header h2 { margin: 0 0 6px; }
      .page-header p { margin: 0; color: #5b687a; }
      .filters-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 24px; }
      .filters-grid label { display: grid; gap: 6px; font-weight: 600; }
      .filters-grid input { border: 1px solid #d6deea; border-radius: 10px; padding: 10px 12px; }
      .actions-row { display: flex; align-items: end; gap: 10px; }
      .results-section h3 { margin: 0 0 12px; }
      .results-table { width: 100%; border-collapse: collapse; }
      .results-table th, .results-table td { padding: 12px; border-bottom: 1px solid #e5eaf3; text-align: left; }
      .table-actions { display: flex; gap: 8px; }
      .primary-btn, .secondary-btn { border: 0; border-radius: 10px; padding: 10px 14px; cursor: pointer; }
      .primary-btn { background: #2f67c7; color: #fff; }
      .secondary-btn { background: #e8edf6; color: #142033; }
      .message-box { margin-bottom: 16px; padding: 12px 14px; border-radius: 10px; background: #e9f7ef; color: #1d6b3b; }
      .message-box-error { background: #fdecec; color: #b42318; }
      .empty-state { padding: 20px 0; color: #5b687a; }
      @media (max-width: 700px) {
        .page-header { flex-direction: column; }
        .actions-row, .table-actions { flex-wrap: wrap; }
        .results-table { display: block; overflow-x: auto; }
      }
    `
  ]
})
export class PatientsSearchComponent implements OnInit {
  filters: PatientSearchFilters = {
    assistedId: '',
    firstName: '',
    lastName: '',
    email: '',
    fiscalCode: '',
    structureId: ''
  };

  results: PatientSummary[] = [];
  message = '';
  messageType: 'success' | 'error' = 'success';

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.search(false);
  }

  translate(key: MessageKey): string {
    return t(key);
  }

  search(showFeedback = true): void {
    let params = new HttpParams();

    for (const [key, value] of Object.entries(this.filters) as Array<[keyof PatientSearchFilters, string]>) {
      if (!value) {
        continue;
      }
      params = params.set(key, value);
    }

    this.http.get<PatientSummary[]>(environment.apiBaseUrl, { params }).subscribe({
      next: (results) => {
        this.results = results;
        if (showFeedback) {
          this.messageType = 'success';
          this.message = '';
        }
      },
      error: (error: HttpErrorResponse) => {
        this.messageType = 'error';
        this.message = this.extractErrorMessage(error, 'crud.error.search');
      }
    });
  }

  reset(): void {
    this.filters = {
      assistedId: '',
      firstName: '',
      lastName: '',
      email: '',
      fiscalCode: '',
      structureId: ''
    };
    this.search(false);
  }

  openNew(): void {
    void this.router.navigateByUrl('/patients/new');
  }

  openEdit(id: number): void {
    void this.router.navigate(['/patients', id]);
  }

  openView(id: number): void {
    void this.router.navigate(['/patients', id, 'view']);
  }

  private extractErrorMessage(error: HttpErrorResponse, fallbackKey: MessageKey): string {
    const detail = error.error?.detail;
    return typeof detail === 'string' && detail.length > 0 ? detail : t(fallbackKey);
  }
}