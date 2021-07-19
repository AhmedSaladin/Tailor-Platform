import { Component, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders: any;
  eve!: Subscription;
  isTailor: any;
  constructor(
    private request_api: OrderService,
    private customer: CustomerService
  ) {
    this.orders = [];
    this.get_all_orders();
    this.isTailor = this.customer.user.value?.IsTailor;
  }

  ngOnInit(): void {}

  get_all_orders() {
    this.request_api.get_current_user_orders().subscribe(
      (res) => {
        console.log(res.body);
        this.orders = res.body;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.eve != undefined) this.eve.unsubscribe();
  }
}
