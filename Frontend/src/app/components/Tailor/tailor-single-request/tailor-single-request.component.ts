import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-tailor-single-request',
  templateUrl: './tailor-single-request.component.html',
  styleUrls: ['./tailor-single-request.component.css'],
})
export class TailorSingleRequestComponent implements OnInit, OnDestroy {
  @Input() order: any;
  user: any;
  eve!: Subscription;
  imags: any;
  count: any = 0;
  current_image: any;
  constructor(
    private customer_api: CustomerService,
    private order_api: OrderService
  ) {}

  ngOnInit(): void {
    this.get_customer_details(this.order.customer_id);
    this.imags = this.order.design;
    this.current_image = this.imags[0];
  }

  get_customer_details(id: any) {
    this.eve = this.customer_api.getCustomerInfoByID(id).subscribe(
      (response: any) => {
        this.user = response;
      },
      (err) => {
        console.error(err);
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

  change_status(state: string) {
    this.order_api.update_status(state, this.order.id).subscribe(
      (res) => {
        console.log(res);
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
