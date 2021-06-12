import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditTailorProfileComponent } from './components/Tailor/edit-tailor-profile/edit-tailor-profile.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { TailorInformationComponent } from './components/Tailor/tailor-information/tailor-information.component';
import { TailorAboutComponent } from './components/Tailor/tailor-about/tailor-about.component';
import { TailorGallaryComponent } from './components/Tailor/tailor-gallary/tailor-gallary.component';
import { TailorRateComponent } from './components/Tailor/tailor-rate/tailor-rate.component';
import { HomeComponent } from './components/home/home.component';
import { AboutTailorComponent } from './components/home/about-tailor/about-tailor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './components/registration/registration.component';


@NgModule({
  declarations: [
    AppComponent,
    EditTailorProfileComponent,
    NavBarComponent,
    FooterComponent,
    TailorInformationComponent,
    TailorAboutComponent,
    TailorGallaryComponent,
    TailorRateComponent,
    HomeComponent,
    AboutTailorComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
