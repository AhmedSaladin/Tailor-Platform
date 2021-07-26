import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UcWidgetComponent } from 'ngx-uploadcare-widget';
import { Subscription } from 'rxjs';
import { BindingService } from 'src/app/services/binding/binding.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-information',
  templateUrl: './customer-information.component.html',
  styleUrls: ['./customer-information.component.css'],
})
export class CustomerInformationComponent implements OnInit {
  @Input() user_info: any;
  @Input() img: any;
  @ViewChild('upload_component') upload_component!: UcWidgetComponent;
  eve!: Subscription;
  editForm!: FormGroup;
  currentUserId?;
  constructor(
    private api: CustomerService,
    private formBulider: FormBuilder,
    private tostr: ToastrService,
    private binding: BindingService
  ) {
    this.currentUserId = this.api.user.value?.Id;
  }

  ngOnInit(): void {
    this.formValidation();
  }

  formValidation() {
    // check sizes problem later
    let sizes: any;
    if (!this.user_info.sizes) {
      sizes = {
        chest: '',
        armLength: ' ',
        waist: ' ',
        height: ' ',
        inseam: ' ',
        shoulder: ' ',
        thigh: ' ',
        collar: ' ',
      };
    } else {
      sizes = {
        chest: this.user_info.sizes.chest,
        armLength: this.user_info.sizes.armLength,
        waist: this.user_info.sizes.waist,
        height: this.user_info.sizes.height,
        inseam: this.user_info.sizes.inseam,
        shoulder: this.user_info.sizes.shoulder,
        thigh: this.user_info.sizes.thigh,
        collar: this.user_info.sizes.collar,
      };
    }
    this.editForm = this.formBulider.group({
      name: [
        this.user_info.name,
        [Validators.required, Validators.minLength(3)],
      ],
      email: [
        this.user_info.email,
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      phone: [
        this.user_info.phone,
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.minLength(11),
          Validators.pattern('^(010|011|012|015)[0-9]{8}$'),
        ],
      ],
      gender: [this.user_info.gender],
      chest: [sizes.chest, [Validators.required, Validators.min(2)]],
      armLength: [sizes.armLength, [Validators.required, Validators.min(2)]],
      waist: [sizes.waist, [Validators.required, Validators.min(2)]],
      height: [sizes.height, [Validators.required, Validators.min(3)]],
      inseam: [sizes.inseam, [Validators.required, Validators.min(2)]],
      shoulder: [sizes.shoulder, [Validators.required, Validators.min(2)]],
      thigh: [sizes.thigh, [Validators.required, Validators.min(2)]],
      collar: [sizes.collar, [Validators.required, Validators.min(2)]],
    });
  }

  get getControl() {
    return this.editForm.controls;
  }

  notSavingCustAvatar() {
    if (this.img != this.user_info.avatar) this.img = this.user_info.avatar;
    this.upload_component.clearUploads();
  }

  saveNewTailorAvatar() {
    if (this.user_info.avatar != this.img) {
      this.user_info.avatar = this.img;
      const { avatar } = this.user_info;
      this.eve = this.api
        .update_customer_info(this.user_info._id, { avatar })
        .subscribe(
          () => {
            this.tostr.success(
              'Your profile image updated successfully',
              'Success'
            );
          },
          (err) => {
            this.if_error(err);
          }
        );
    }
    this.upload_component.clearUploads();
  }
  on_upload_complete(event: any) {
    this.img = event.cdnUrl;
  }
  updateCustInfo(form: FormGroup) {
    if (form.pristine) return;
    const user = {
      name: form.value.name,
      phone: form.value.phone,
      gender: form.value.gender,
      sizes: {
        chest: form.value.chest,
        armLength: form.value.armLength,
        waist: form.value.waist,
        height: form.value.height,
        inseam: form.value.inseam,
        shoulder: form.value.shoulder,
        thigh: form.value.thigh,
        collar: form.value.collar,
      },
    };

    this.eve = this.api
      .update_customer_info(this.user_info._id, user)
      .subscribe(
        () => {
          this.tostr.success('Information Updated Successfully', 'Success', {
            positionClass: 'toast-top-center',
          });
          this.user_info.name = user.name;
          this.user_info.phone = user.phone;
          this.user_info.gender = user.gender;
          this.user_info.sizes = user.sizes;
          form.markAsPristine();
        },
        (err) => {
          this.if_error(err);
        }
      );
  }

  if_error(err: any) {
    this.binding.changeLoading(false);
    this.tostr.error(err, 'Error', { positionClass: 'toast-top-center' });
  }

  ngOnDestroy(): void {
    if (this.eve != undefined) this.eve.unsubscribe();
  }
}
