import { Component, OnInit } from '@angular/core';
import { CustomerService } from './services/customer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Frontend';
  constructor(private user: CustomerService) {}
  // adding user into app memory after every rerender
  ngOnInit(): void {
    this.user.autoLogin();
  }
}
