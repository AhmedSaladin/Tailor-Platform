import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UcWidgetComponent } from 'ngx-uploadcare-widget';
import { Subscription } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from '../../shared/models';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit, OnDestroy {
  isLoading: Boolean = false;
  sizes!: Object;
  eve!: Subscription;
  order!: Order;
  images: Array<string>;
  sizesValidation: any;
  isUploading: Boolean = true;
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
  }
  ngOnInit(): void {
    this.sizesValidation = this.formBulider.group({
      chest: [` `, [Validators.required, Validators.minLength(2)]],
      shoulder: [` `, [Validators.required, Validators.minLength(2)]],
      inseam: [` `, [Validators.required, Validators.minLength(2)]],
      waist: [` `, [Validators.required, Validators.minLength(2)]],
      height: [` `, [Validators.required, Validators.minLength(3)]],
      armLength: [` `, [Validators.required, Validators.minLength(2)]],
      collar: [` `, [Validators.required, Validators.minLength(2)]],
      thigh: [` `, [Validators.required, Validators.minLength(2)]],
    });
  }

  get getControl() {
    return this.sizesValidation.controls;
  }

  submitD(customer_sizes: NgForm) {
    if (this.check_login()) {
      this.order = {
        customer_id: `${this.currentUserId}`,
        tailor_id: this.url.snapshot.params.id,
        status: 'pending',
        design: this.images,
        customer_sizes: customer_sizes.value,
      };
      this.http.create_new_order(this.order).subscribe(
        () => {
          this.toastr.success('Order have been created successfully ');
          this.clear_uploads();
          customer_sizes.resetForm;
        },
        (err) => {
          this.toastr.error(err);
        }
      );
    }
  }

  on_upload_complete(event: any) {
    let url = event.cdnUrl;
    let length = event.count;
    for (let i = 0; i < length; i++) {
      this.images.push(`${url}nth/${i}/`);
    }
    this.isUploading = false;
    this.order_upload_component.clearUploads();
  }

  clear_uploads() {
    this.images = [];
  }

  get_user_sizes(customer_sizes: NgForm) {
    if (this.check_login()) {
      this.isLoading = true;
      this.api.get_customer_info_id(this.currentUserId).subscribe(
        (res) => {
          this.isLoading = false;
          if (!res.sizes) {
            this.toastr.warning(`Your didn't add sizes yet`, 'warning', {
              positionClass: 'toast-top-center',
            });
          } else {
            customer_sizes.controls['chest'].setValue(res.sizes.chest);
            customer_sizes.controls['shoulder'].setValue(res.sizes.shoulder);
            customer_sizes.controls['inseam'].setValue(res.sizes.inseam);
            customer_sizes.controls['waist'].setValue(res.sizes.waist);
            customer_sizes.controls['height'].setValue(res.sizes.height);
            customer_sizes.controls['armLength'].setValue(res.sizes.armLength);
            customer_sizes.controls['collar'].setValue(res.sizes.collar);
            customer_sizes.controls['thigh'].setValue(res.sizes.thigh);
            this.toastr.success('Your sizes fetched', 'Success', {
              positionClass: 'toast-top-center',
            });
          }
        },
        (err) => {
          this.toastr.error(err, 'Error', {
            positionClass: 'toast-top-center',
          });
        }
      );
    }
  }

  delete_image(img: string) {
    this.images = this.images.filter((image) => image != img);
    if (this.images.length > 0) return (this.isUploading = false);
    return (this.isUploading = true);
  }
  
  check_login() {
    if (this.currentUserId == undefined) {
      this.toastr.warning('Please sign in first.', 'Warning');
      this.router.navigate(['login']);
      const modal = document.querySelector('.modal-backdrop');
      if (modal != null) modal.remove();
      return false;
    }
    return true;
  }

  ngOnDestroy() {
    if (this.eve != undefined) this.eve.unsubscribe();
  }
}
