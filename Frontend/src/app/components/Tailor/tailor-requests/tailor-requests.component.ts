import { Component, Input, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-tailor-requests',
  templateUrl: './tailor-requests.component.html',
  styleUrls: ['./tailor-requests.component.css'],
})
export class TailorRequestsComponent implements OnInit {
  @Input() user_id: any;
  requests: any;
  user_name: any;
  constructor(
    private request_api: OrderService,
    private customer_api: CustomerService
  ) {}

  ngOnInit(): void {
    this.get_all_orders();
  }
  get_all_orders() {
    this.request_api.get_tailor_requests(this.user_id).subscribe(
      (response: any) => {
        this.requests = response.body;
        // this.requests = response.body.map((order: any) => {
        //   console.log(order);
        //   order.customer_name = this.get_customer_name(order.customer_id);
        //   console.log(order.customer_name);
        // });
      },
      (err) => {
        console.error(err);
      }
    );
  }

  get_customer_name(id: any) {
    let name: any;
    this.customer_api.getCustomerInfoByID(id).subscribe(
      (response: any) => {
        console.log(response);
        name = response.name;
      },
      (err) => {
        console.error(err);
      }
    );
    return name;
  }
}
