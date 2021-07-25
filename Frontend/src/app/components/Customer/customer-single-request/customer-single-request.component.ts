import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommentService } from 'src/app/services/comment.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-customer-single-request',
  templateUrl: './customer-single-request.component.html',
  styleUrls: ['./customer-single-request.component.css'],
})
export class CustomerSingleRequestComponent implements OnInit {
  @Input() order: any;
  user: any;
  tailor: any;
  eve: any;
  imags: any;
  count: any = 0;
  current_image: any;
  CommentForm: any;
  hasComment: any = false;
  constructor(
    private commentApi: CommentService,
    private toastr: ToastrService,
    private order_api: OrderService
  ) {}

  ngOnInit(): void {
    this.imags = this.order.designs;
    //get tailor & customer data  from ordeer
    this.current_image = this.imags[0];
    this.formValidation();
    this.getComment(this.order._id);
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
  formValidation() {
    this.CommentForm = new FormGroup({
      comment: new FormControl('', [Validators.maxLength(1000)]),
      rate: new FormControl(0, [Validators.required]),
    });
  }
  get rate() {
    return this.CommentForm.get('rate');
  }
  get comment() {
    return this.CommentForm.get('comment');
  }

  ///Submit comment///
  onSubmit() {
    if (this.CommentForm.valid) {
      let newComment = {
        body: this.comment?.value,
        rate: this.rate?.value,
        tailor_id: this.order.tailor_id,
        customer_id: this.order.customer_id,
        //name in join
        order_id: this.order._id,
      };
      this.commentApi.CreateCommenr(newComment).subscribe(
        (res) => {
          this.hasComment = true;
          this.toastr.success('thanks ^-^'); //create comment done
        },
        (err) => {
          this.toastr.error('error !-_-');
        }
      );
    }
  }

  /////////////has comment//////////////////
  getComment(id: any) {
    this.commentApi.get_comments_by_order_id(id).subscribe(
      (res) => {
        let currentComment: any = res.body;
        if (currentComment.length > 0) {
          this.hasComment = true;
        } else {
          this.hasComment = false;
        }
      },
      (err) => {
        console.log(err);
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
        send_from: 'customer',
      };
      this.eve = this.order_api
        .update_comment(newComment, this.order._id)
        .subscribe(
          (res) => {
            console.log(res.body);
            this.order.comments = res.body;
            this.toastr.success('Message send', 'Success');
          },
          (err) => {
            this.toastr.error(err, 'Error');
          }
        );
      message.value = '';
      // console.log(message)
    }
    //message.placeholder="Leave a comment here"
  }
  ngOnDestroy(): void {
    if (this.eve != undefined) this.eve.unsubscribe();
  }
}
