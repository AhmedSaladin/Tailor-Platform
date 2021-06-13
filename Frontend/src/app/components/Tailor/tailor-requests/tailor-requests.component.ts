import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-tailor-requests',
  templateUrl: './tailor-requests.component.html',
  styleUrls: ['./tailor-requests.component.css'],
})
export class TailorRequestsComponent implements OnInit, OnDestroy {
  @Input() user_id: any;
  requests: any;
  eve: any;
  constructor(private request_api: OrderService) {}

  ngOnInit(): void {
    this.get_all_orders();
  }
  get_all_orders() {
    this.eve = this.request_api.get_tailor_requests(this.user_id).subscribe(
      (response: any) => {
        this.requests = response.body;
      },
      (err) => {
        console.error(err);
      }
    );
  }
  ngOnDestroy(): void {
    this.eve.unsubscribe();
  }
}
