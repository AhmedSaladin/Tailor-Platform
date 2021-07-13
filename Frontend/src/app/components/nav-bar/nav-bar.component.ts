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
  constructor(private customer: CustomerService) {}

  ngOnInit(): void {
    this.eve = this.customer.user.subscribe((user) => {
      console.log(user);
      if (user) this.isAuthenticated = true;
    });
  }
  ngOnDestroy(): void {
    if (this.eve) this.eve.unsubscribe();
  }
}
