import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { HeaderComponent } from './components/home/header/header.component';
import { AboutTailorComponent } from './components/home/about-tailor/about-tailor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import { TailorSingleRequestComponent } from './components/Tailor/tailor-single-request/tailor-single-request.component';
import { UcWidgetModule } from 'ngx-uploadcare-widget';
import { FilterPipe } from './filter.pipe';
import { CustomerInformationComponent } from './components/Customer/customer-information/customer-information.component';
import { CustomerSingleRequestComponent } from './components/Customer/customer-single-request/customer-single-request.component';
import { CustomerProfileComponent } from './components/Customer/customer-profile/customer-profile.component';
import { BookingComponent } from './components/Tailor/booking/booking.component';
import { TailorCommentsComponent } from './components/Tailor/tailor-comments/tailor-comments.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidenavComponent } from './components/dashboard/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { TailorsDashboardComponant } from './components/dashboard/tailors-dashboard/tailors-dashboard.component';
import { CustomersComponent } from './components/dashboard/customers/customers.component';
import { TokenIntercetorService } from './services/token-interceptor.service';
import { OrdersDashboardComponent } from './components/dashboard/orders-dashboard/orders-dashboard.component';
import { OrdersComponent } from './components/shared/orders/orders.component';
import { BindingService } from './services/binding/binding.service';
@NgModule({
  declarations: [
    OrdersComponent,
    AppComponent,
    EditTailorProfileComponent,
    NavBarComponent,
    FooterComponent,
    TailorInformationComponent,
    TailorAboutComponent,
    TailorGallaryComponent,
    TailorRateComponent,
    HomeComponent,
    HeaderComponent,
    AboutTailorComponent,
    RegistrationComponent,
    LoginComponent,
    LandingComponent,
    TailorSingleRequestComponent,
    FilterPipe,
    CustomerInformationComponent,
    CustomerSingleRequestComponent,
    CustomerProfileComponent,
    BookingComponent,
    TailorCommentsComponent,
    LoadingComponent,
    DashboardComponent,
    SidenavComponent,
    CustomersComponent,
    TailorsDashboardComponant,
    OrdersDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    UcWidgetModule,
    NgbModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenIntercetorService,
      multi: true,
    },
    BindingService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
