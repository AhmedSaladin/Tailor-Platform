import { Component, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';
import { ToastrService } from 'ngx-toastr';
import { BindingService } from 'src/app/services/binding/binding.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders: any;
  eve!: Subscription;
  isTailor: any;
  page: number = 1;
  totalPages: number = 1;
  constructor(
    private request_api: OrderService,
    private customer: CustomerService,
    private tostr: ToastrService,
    private binding: BindingService
  ) {
    this.orders = [];
    this.get_all_orders();
    this.isTailor = this.customer.user.value?.IsTailor;
  }

  ngOnInit(): void {}

  get_all_orders() {
    this.eve = this.request_api.get_current_user_orders(this.page).subscribe(
      (res) => {
        this.totalPages = res.totalPages;
        this.orders = res.orders;
      },
      (err) => {
        this.binding.changeLoading(false);
        this.tostr.error(err, 'Error', { positionClass: 'toast-top-center' });
      }
    );
  }
  nextPage() {
    if (this.page === this.totalPages) return;
    this.page++;
    this.get_all_orders();
  }
  previousPage() {
    if (this.page === 1) return;
    this.page--;
    this.get_all_orders();
  }
  ngOnDestroy(): void {
    if (this.eve != undefined) this.eve.unsubscribe();
  }
}
