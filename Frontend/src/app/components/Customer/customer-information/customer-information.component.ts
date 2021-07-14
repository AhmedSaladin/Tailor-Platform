import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { UcWidgetComponent } from 'ngx-uploadcare-widget';
import { Subscription } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';
import { User } from 'src/app/services/user.model';

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
  constructor(private api: CustomerService, private formBulider: FormBuilder) {}

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
    console.log(this.img);
    console.log(this.user_info.avatar);
    this.user_info.avatar = this.img;
    console.log(this.user_info.id);
    this.eve = this.api
      .update_customer_info(this.user_info.id, this.user_info)
      .subscribe();
    this.upload_component.clearUploads();
  }
  on_upload_complete(event: any) {
    this.img = event.cdnUrl;
  }
  updateCustInfo(form: FormGroup) {
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
      .subscribe((res) => console.log(res));
  }

  ngOnDestroy(): void {
    if (this.eve != undefined) this.eve.unsubscribe();
  }
}
