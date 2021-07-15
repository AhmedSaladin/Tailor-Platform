import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { TailorService } from 'src/app/services/tailor.service';

@Component({
  selector: 'app-customer-requests',
  templateUrl: './customer-requests.component.html',
  styleUrls: ['./customer-requests.component.css'],
})
export class CustomerRequestsComponent implements OnInit {
  requests = [];
  cust_id: String;
  eve!: Subscription;
  constructor(
    private request_api: OrderService,
    private activeRout: ActivatedRoute
  ) {
    this.cust_id = activeRout.snapshot.params.id;
    this.get_all_orders();
  }

  ngOnInit(): void {}

  get_all_orders() {
    this.eve = this.request_api.get_customer_requests(this.cust_id).subscribe(
      (response: any) => {
        this.requests = response.body;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.eve != undefined) this.eve.unsubscribe();
  }
}
