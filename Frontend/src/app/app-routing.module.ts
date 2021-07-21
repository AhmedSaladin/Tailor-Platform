import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerProfileComponent } from './components/Customer/customer-profile/customer-profile.component';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { TailorProfileComponent } from './components/Tailor/tailor-profile/tailor-profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomersComponent } from './components/dashboard/customers/customers.component';
import { TailorsDashboardComponant } from './components/dashboard/tailors-dashboard/tailors-dashboard.component';
import { OrdersDashboardComponent } from './components/dashboard/orders-dashboard/orders-dashboard.component';
import { AuthGuardService } from './services/auth-guard.service';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: 'signup', component: RegistrationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'tailor/:id', component: TailorProfileComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'user/:id',
    canActivate: [AuthGuardService],
    component: CustomerProfileComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'customers', component: CustomersComponent },
      { path: 'tailors', component: TailorsDashboardComponant },
      { path: 'orders', component: OrdersDashboardComponent },
    ],
  },

  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
