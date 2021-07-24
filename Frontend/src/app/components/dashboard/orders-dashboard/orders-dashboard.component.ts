import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { BindingService } from 'src/app/services/binding/binding.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders-dashboard',
  templateUrl: './orders-dashboard.component.html',
  styleUrls: ['./orders-dashboard.component.css'],
})
export class OrdersDashboardComponent implements OnInit, OnDestroy {
  orders: any;
  cstOrder: any;
  eve!: Subscription;

  imags: any;
  count: any = 0;
  current_image: any;

  constructor(
    private orderService: OrderService,
    private tostr: ToastrService,
    private binding: BindingService
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrder().subscribe(
      (res) => {
        this.orders = res;
      },
      (err) => {
        this.if_error(err);
      }
    );
  }
  
  deleteOrder(id: any) {
    const yes = confirm('Do you want delete this Order');
    if (yes) {
      this.orderService.deleteOrder(id).subscribe(
        () => {
          this.tostr.success('Customer deleted successfully', 'Success', {
            positionClass: 'toast-top-center',
          });
          this.getOrders();
        },
        (err) => {
          this.if_error(err);
        }
      );
    }
  }

  getInfo(id: any) {
    this.orderService.getOrderById(id).subscribe(
      (res) => {
        this.cstOrder = res.body;
        this.cstOrder = this.cstOrder[0]; ////res.body return arr of obj not obj
      },
      (err) => {
        this.if_error(err);
      }
    );
  }

  next_img() {
    if (this.imags.length - 1 > this.count) this.count++;
    else this.count = 0;
    this.current_image = this.imags[this.count];
  }

  last_img() {
    if (this.count == 0) this.count = this.imags.length - 1;
    else this.count--;
    this.current_image = this.imags[this.count];
  }

  if_error(err: any) {
    this.binding.changeLoading(false);
    this.tostr.error(err, 'Error', { positionClass: 'toast-top-center' });
  }

  ngOnDestroy(): void {
    if (this.eve != undefined) this.eve.unsubscribe();
  }
}
