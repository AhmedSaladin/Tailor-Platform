import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { TailorService } from 'src/app/services/tailor.service';

@Component({
  selector: 'app-customer-requests',
  templateUrl: './customer-requests.component.html',
  styleUrls: ['./customer-requests.component.css']
})
export class CustomerRequestsComponent implements OnInit {
  @Input() custId:any;
  @Output() requests: any;
  cust_id:any;
  eve: any;
  constructor(private request_api: OrderService,private tailor_api:TailorService,private activeRout: ActivatedRoute) {
    this.cust_id=activeRout.snapshot.params.id;
    this.get_all_orders();
  }

  ngOnInit(): void {
    console.log(this.cust_id)
  }
  get_all_orders() {
    this.eve = this.request_api.get_customer_requests(this.cust_id).subscribe(
      (response: any) => {
        this.requests = response.body;
        console.log(response.body)
      },
      (err) => {
        console.error(err);
      }
    );
  }
 // get_tailor
  ngOnDestroy(): void {
    if (this.eve != undefined) this.eve.unsubscribe();  }
}
