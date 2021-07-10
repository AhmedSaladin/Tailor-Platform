import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UcWidgetComponent } from 'ngx-uploadcare-widget';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';
// form need validation about designs not to be empty
// add delete to uploaded images from UI and DB

interface Order {
  customer_id: string;
  customer_name: string;
  tailor_id: string;
  status: string;
  design: Array<string>;
  customer_sizes: {
    chest: number;
    armLength: number;
    waist: number;
    hight: number;
    inseam: number;
    shoulder: number;
    collar: number;
    sleeve: number;
  };
}
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit, OnDestroy {
  user: any;
  eve: any;
  order!: Order;
  images: Array<string>;
  sizesValidation: any;

  @ViewChild('order_upload_component')
  order_upload_component!: UcWidgetComponent;
  constructor(
    private api: CustomerService,
    private url: ActivatedRoute,
    private http: OrderService,
    public formBulider: FormBuilder
  ) {
    this.get_customer_data();
    this.images = [];
    // Create user id and get it form local storge when auth done.
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
  }

  get getControl() {
    return this.sizesValidation.controls;
  }
  get_customer_data() {
    // ID is hard coded it change when auth work.
    this.eve = this.api.get_customer_info_id(1).subscribe(
      (res) => {
        this.user = res.body;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  submitD(customer_sizes: NgForm) {
    console.log(customer_sizes);
    this.order = {
      customer_id: `${this.user.id}`,
      customer_name: this.user.name,
      tailor_id: this.url.snapshot.params.id,
      status: 'pending',
      design: this.images,
      customer_sizes: customer_sizes.value,
    };
    this.http.create_new_order(this.order).subscribe(
      (res) => {
        console.log(res);
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
    this.eve.unsubscribe();
  }
}
