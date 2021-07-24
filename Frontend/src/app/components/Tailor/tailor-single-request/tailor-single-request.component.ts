import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-tailor-single-request',
  templateUrl: './tailor-single-request.component.html',
  styleUrls: ['./tailor-single-request.component.css'],
})
export class TailorSingleRequestComponent implements OnInit, OnDestroy {
  @Input() order: any;
  eve!: Subscription;
  imags: any;
  count: any = 0;
  current_image: any;
  constructor(private order_api: OrderService, private tostr: ToastrService) {}

  ngOnInit(): void {
    this.imags = this.order.designs;
    this.current_image = this.imags[0];
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
    this.eve = this.order_api.update_status(state, this.order._id).subscribe(
      () => {
        this.tostr.success('Order update successfuly', 'Success');
        this.order.status = state;
      },
      (err) => {
        this.tostr.error(err, 'Error');
      }
    );
  }

  ngOnDestroy(): void {
    if (this.eve != undefined) this.eve.unsubscribe();
  }
}
