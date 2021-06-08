import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditTailorProfileComponent } from './components/Tailor/edit-tailor-profile/edit-tailor-profile.component';

const routes: Routes = [
  { path: '', redirectTo: './profile/edit/:id', pathMatch: 'full' },
  { path: './profile/edit/:id', component: EditTailorProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
