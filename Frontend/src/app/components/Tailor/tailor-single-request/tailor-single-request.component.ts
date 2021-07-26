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
  today:any;
  currentPrice:any;
  constructor(private order_api: OrderService, private tostr: ToastrService) { }

  ngOnInit(): void {
    this.imags = this.order.designs;
    this.current_image = this.imags[0];
    if(this.order.deliveryDare===undefined)
      this.today =new Date();
    else
    {
      this.currentPrice=this.order.price;
      this.today =this.order.deliveryDare;
    }
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
send_commment(message:any){
  if (message.value.length>0) {
    let myDate = new Date();
    let newComment={
      date:myDate,
      comment_body:message.value,
      send_from:'tailor'
    }
    this.eve = this.order_api.update_comment(newComment, this.order._id).subscribe(
      (res) => {
        // console.log(res.body)
        this.order.comments=res.body;
        this.tostr.success('Message send', 'Success');
      },
      (err) => {
        this.tostr.error(err, 'Error');
      }
    );
    message.value="";
   // console.log(message)
  }
  //message.placeholder="Leave a comment here"
}

/////////////////////////////send price
send_price(price:any,deadline:any){
   console.log(deadline.valueAsDate);
   let updateStatus="pending";
  // console.log(this.order.price);
  if (price.value>0) {
    if(this.order.status==="accepted")
      updateStatus="updated";
    this.eve = this.order_api.update_price(price.value,deadline.valueAsDate ,updateStatus,this.order._id).subscribe(
      (res) => {
          console.log(res.body)
         this.order.price=price.value;
         this.order.status=updateStatus;
         this.order.deliveryDare=deadline.valueAsDate;
        this.tostr.success('send', 'Success');
      },
      (err) => {
        this.tostr.error(err, 'Error');
      }
    );
   // console.log(message)
  }
}
  ngOnDestroy(): void {
    if (this.eve != undefined) this.eve.unsubscribe();
  }
}
