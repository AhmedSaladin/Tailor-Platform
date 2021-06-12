import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-tailor-single-request',
  templateUrl: './tailor-single-request.component.html',
  styleUrls: ['./tailor-single-request.component.css'],
})
export class TailorSingleRequestComponent implements OnInit, OnDestroy {
  @Input() order: any;
  user: any;
  eve: any;
  constructor(private customer_api: CustomerService) {}

  ngOnInit(): void {
    this.get_customer_details(this.order.customer_id);
  }

  get_customer_details(id: any) {
    this.eve = this.customer_api.getCustomerInfoByID(id).subscribe(
      (response: any) => {
        this.user = response;
        console.log(response);
      },
      (err) => {
        console.error(err);
      }
    );
  }
  next_img(n: any) {
    // console.log(n);
    // if (this.imags.length - 1 == this.count) this.count = 0;
    // if (this.imags.length > 1) {
    //   this.count++;
    // }
    // this.current_image = this.imags[this.count];
    // console.log('hooo');
  }
  pre_image() {}
  ngOnDestroy(): void {
    this.eve.subscribe();
  }
}
