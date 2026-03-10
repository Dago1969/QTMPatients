import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { PatientsSearchComponent } from './features/patients-search/patients-search.component';
import { PatientsCrudComponent } from './features/patients/patients-crud.component';

/**
 * Rotte principali dell'applicazione pazienti.
 */
export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'patients/search' },
  { path: 'patients/search', component: PatientsSearchComponent, canActivate: [authGuard] },
  { path: 'patients/new', component: PatientsCrudComponent, canActivate: [authGuard] },
  { path: 'patients/:id', component: PatientsCrudComponent, canActivate: [authGuard] },
  { path: 'patients/:id/view', component: PatientsCrudComponent, canActivate: [authGuard], data: { mode: 'view' } },
  { path: '**', redirectTo: 'patients/search' }
];