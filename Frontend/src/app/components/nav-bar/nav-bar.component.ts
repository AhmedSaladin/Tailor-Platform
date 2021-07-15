import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  eve!: Subscription;
  isAuthenticated: Boolean = false;
  isAdmin: Boolean = false;
  id!: String | null;
  isTailor!: Boolean | null;
  link: String = 'user';
  constructor(private customer: CustomerService) {}

  ngOnInit(): void {
    this.eve = this.customer.user.subscribe((user) => {
      if (!user) return;
      this.id = user.Id;
      this.isTailor = user.IsTailor;
      if (user) this.isAuthenticated = true;
      if (this.isTailor) this.link = 'tailor';
    });
  }
  onLogout() {
    this.customer.logout();
    this.isAuthenticated = false;
  }

  ngOnDestroy(): void {
    if (this.eve) this.eve.unsubscribe();
  }
}
