import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { CustomerService } from 'src/app/services/customer.service';
import { TailorService } from 'src/app/services/tailor.service';

@Component({
  selector: 'app-customer-single-request',
  templateUrl: './customer-single-request.component.html',
  styleUrls: ['./customer-single-request.component.css']
})
export class CustomerSingleRequestComponent implements OnInit {
  @Input() order:any;
  user: any;
  tailor: any;
  eve: any;
  imags: any;
  count: any = 0;
  current_image: any;
  CommentForm:any;
  orderRate:any;
  constructor(private commentApi: CommentService,private customer_api: CustomerService,private tailor_api:TailorService) {
  }

  ngOnInit(): void {
    this.get_tailor_details(this.order.tailor_id);
    this.get_customer_details(this.order.customer_id);
    this.imags = this.order.design;
    this.current_image = this.imags[0];
    this.formValidation()
  }
  get_tailor_details(id:any){
    this.eve = this.tailor_api.get_tailor_info(id).subscribe(
      (response: any) => {
        this.tailor = response.body;
        console.log(this.tailor)
      },
      (err) => {
        console.error(err);
      }
    );
  }
  get_customer_details(id: any) {
    console.log(this.order)
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
  ////////////////new comment /////////////////////////
  formValidation(){
    this.CommentForm=new FormGroup({
      comment:new FormControl('',[
        Validators.maxLength(1000),
      ]),
      rate:new FormControl()
    })
  }
  get rate() {
    return this.CommentForm.get('rate');
  }
  get comment() {
    return this.CommentForm.get('comment');
  }
      ///Submit comment///
  onSubmit(){
    if(this.CommentForm.valid){
      // console.log(this.comment?.value)
      let newComment={
        body:this.comment?.value,
        rate:this.orderRate,
        tailor_id:this.order.tailor_id,
        customer_id:this.order.customer_id,
        order_id:this.order.id
      }
      this.commentApi.CreateCommenr(newComment).subscribe();
    }
  }

  // average = 0;
  // coun = 0;
  // currentRate = 6;

  // avg() {
  //   this.average = (this.average*this.coun + this.currentRate) / (this.coun + 1);
  //   this.coun += 1;
  // }
  ngOnDestroy(): void {
    if (this.eve != undefined) this.eve.unsubscribe();  }
}

