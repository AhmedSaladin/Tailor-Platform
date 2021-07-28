import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  today: any;
  currentPrice = 0;
  currentdate: any;
  constructor(private order_api: OrderService, private tostr: ToastrService) {}

  ngOnInit(): void {
    this.imags = this.order.designs;
    this.current_image = this.imags[0];
    this.today = new Date();
    if (this.order.deliveryDare === undefined) this.currentdate = new Date();
    else {
      this.currentPrice = this.order.price;
      this.currentdate = this.order.deliveryDare;
    }
    this.priceValidation();
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

  //////////////////////////////
  send_commment(message: any) {
    if (message.value.length > 0) {
      let myDate = new Date();
      let newComment = {
        date: myDate,
        comment_body: message.value,
        send_from: 'tailor',
      };
      this.eve = this.order_api
        .update_comment(newComment, this.order._id)
        .subscribe(
          (res) => {
            this.order.comments = res.body;
            this.tostr.success('Message send', 'Success');
          },
          (err) => {
            this.tostr.error(err, 'Error');
          }
        );
      message.value = '';
    }
  }

  //////////////////vaildation//////////////////////////
  priceForm: any;
  priceValidation() {
    this.priceForm = new FormGroup({
      offerPrice: new FormControl(this.currentPrice, [Validators.required]),
    });
  }

  get price() {
    return this.priceForm.get('offerPrice');
  }

  /////////////////////////////send price
  send_price(deadline: any) {
    if (this.price <= 0 || !this.price) return;
    let updateStatus = 'pending';
    if (this.priceForm.valid) {
      if (this.order.status === 'accepted') updateStatus = 'updated';
      this.eve = this.order_api
        .update_price(
          this.price?.value,
          deadline.valueAsDate,
          updateStatus,
          this.order._id
        )
        .subscribe(
          () => {
            this.order.price = this.price?.value;
            this.order.status = updateStatus;
            this.order.deliveryDare = deadline.valueAsDate;
            this.tostr.success('Your offer send to customer', 'Success');
          },
          (err) => {
            this.tostr.error(err, 'Error');
          }
        );
    }
  }
  ngOnDestroy(): void {
    if (this.eve != undefined) this.eve.unsubscribe();
  }
}
