import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditCustomerProfileComponent } from './components/Customer/edit-customer-profile/edit-customer-profile.component';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { EditTailorProfileComponent } from './components/Tailor/edit-tailor-profile/edit-tailor-profile.component';

const routes: Routes = [
  { path: 'signup', component: RegistrationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile/edit/:id', component: EditTailorProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cust/edit/:id', component: EditCustomerProfileComponent },
  { path: '', component: LandingComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
