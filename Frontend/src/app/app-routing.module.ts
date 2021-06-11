import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { EditTailorProfileComponent } from './components/Tailor/edit-tailor-profile/edit-tailor-profile.component';

const routes: Routes = [
  {path:'signup',component:RegistrationComponent},
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // TODO Change it with the landing-page when it's done
  { path: 'profile/edit/:id', component: EditTailorProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
