import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UcWidgetComponent } from 'ngx-uploadcare-widget';
import { Subscription } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from '../../shared/models';
// form need validation about designs not to be empty
// add delete to uploaded images from UI and DB

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit, OnDestroy {
  user: any;
  eve!: Subscription;
  order!: Order;
  images: Array<string>;
  sizesValidation: any;
  @Input() currentUserId: any;

  @ViewChild('order_upload_component')
  order_upload_component!: UcWidgetComponent;
  constructor(
    private api: CustomerService,
    private url: ActivatedRoute,
    private http: OrderService,
    private formBulider: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.images = [];
    // sizes need to fix when auth done.
  }
  ngOnInit(): void {
    // this.sizesValidation = this.formBulider.group({
    //   chest: [`${this.user.chest}`, Validators.required],
    //   shoulder: [`${this.user.shoulder}`, Validators.required],
    //   inseam: [`${this.user.inseam}`, Validators.required],
    //   waist: [`${this.user.waist}`, Validators.required],
    //   height: [`${this.user.height}`, Validators.required],
    //   armLength: [`${this.user.armLength}`, Validators.required],
    //   collar: [`${this.user.collar}`, Validators.required],
    //   sleeve: [`${this.user.sleeve}`, Validators.required],
    // });
    this.sizesValidation = this.formBulider.group({
      chest: [` `, Validators.required],
      shoulder: [` `, Validators.required],
      inseam: [` `, Validators.required],
      waist: [` `, Validators.required],
      height: [` `, Validators.required],
      armLength: [` `, Validators.required],
      collar: [` `, Validators.required],
      sleeve: [` `, Validators.required],
    });
    this.get_customer_data();
  }

  get getControl() {
    return this.sizesValidation.controls;
  }
  get_customer_data() {
    this.user = this.api.user.value?.Id;
  }

  submitD(customer_sizes: NgForm) {
    if (this.user == undefined) {
      this.router.navigate(['login']);
      this.toastr.warning('Please sign in first.');
    }
    this.order = {
      customer_id: `${this.user}`,
      tailor_id: this.url.snapshot.params.id,
      status: 'pending',
      design: this.images,
      customer_sizes: customer_sizes.value,
    };
    this.http.create_new_order(this.order).subscribe(
      () => {
        this.toastr.success('Order have been created successfully ');
      },
      (err) => console.log(err)
    );
  }

  on_upload_complete(event: any) {
    let url = event.cdnUrl;
    let length = event.count;
    for (let i = 0; i < length; i++) {
      this.images.push(`${url}nth/${i}/`);
    }
    this.order_upload_component.clearUploads();
  }

  clear_uploads() {
    this.images = [];
  }

  ngOnDestroy() {
    if (this.eve != undefined) this.eve.unsubscribe();
  }
}
