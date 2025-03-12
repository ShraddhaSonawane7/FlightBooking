import { Route } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { PassengerDashboardComponent } from './component/passenger-dashboard/passenger-dashboard.component';
import { EditFlightComponent } from './component/edit-flight/edit-flight.component';

export const routes: Route[] = [
  { path: '', redirectTo: '/admin-dashboard', pathMatch: 'full' },  // Default route, redirects to login page
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'passenger-dashboard', component: PassengerDashboardComponent },
  { path: 'edit-flight/:id', component: EditFlightComponent },
];
