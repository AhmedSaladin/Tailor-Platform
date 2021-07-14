import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditCustomerProfileComponent } from './components/Customer/edit-customer-profile/edit-customer-profile.component';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { EditTailorProfileComponent } from './components/Tailor/edit-tailor-profile/edit-tailor-profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomersComponent } from './components/dashboard/customers/customers.component';
import { TailorsDashboardComponant } from './components/dashboard/tailors-dashboard/tailors-dashboard.component';
import { OrdersDashboardComponent } from './components/dashboard/orders-dashboard/orders-dashboard.component';

const routes: Routes = [
  { path: 'signup', component: RegistrationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'tailor/:id', component: EditTailorProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'customer/:id', component: EditCustomerProfileComponent },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
