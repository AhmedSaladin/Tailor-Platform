import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UcWidgetComponent } from 'ngx-uploadcare-widget';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-information',
  templateUrl: './customer-information.component.html',
  styleUrls: ['./customer-information.component.css']
})
export class CustomerInformationComponent implements OnInit {
  @Input() user_info: any;
  @Input() img: any;
  @ViewChild('upload_component') upload_component!: UcWidgetComponent;
  eve: any;
  editForm:any;
  constructor(private api: CustomerService) { }

  ngOnInit(): void {
    this.formValidation()
  }

  //not_saving_tailor_avatar(){}
  //save_new_tailor_avatar(){}

  notSavingCustAvatar() {
    if (this.img != this.user_info.avatar) this.img = this.user_info.avatar;
    this.upload_component.clearUploads();
  }

  saveNewTailorAvatar() {
    console.log(this.img)
    console.log(this.user_info.avatar)
    this.user_info.avatar = this.img;
    console.log(this.user_info.id)
    this.eve = this.api
    .update_customer_info(this.user_info.id, this.user_info)
    .subscribe();
    this.upload_component.clearUploads();
  }
  on_upload_complete(event: any) {
    this.img = event.cdnUrl;
  }


  // updateCustInfo(user: NgForm) {
  //   this.user_info.name = user.value.name;
  //   this.user_info.email = user.value.email;
  //   this.user_info.phone = user.value.phone;
  //   this.user_info.gender = user.value.gender;
  //   this.user_info.chest = user.value.chest;
  //   this.user_info.armLength = user.value.armLength;
  //   this.user_info.waist = user.value.waist;
  //   this.user_info.hight = user.value.hight;
  //   this.user_info.inseam = user.value.inseam;
  //   this.user_info.shoulder = user.value.shoulder;
  //   this.eve = this.api
  //   .update_customer_info(this.user_info.id, this.user_info)
  //     .subscribe();
  // }
  updateCustInfo() {
    if(this.editForm.valid){
       console.log(this.email?.value)
       this.user_info.name = this.name?.value;
       this.user_info.email = this.email?.value;
       this.user_info.phone = this.phone?.value;
       this.user_info.gender = this.gender?.value;
       this.user_info.chest = this.chest?.value;
       this.user_info.armLength = this.armLength?.value;
       this.user_info.waist = this.waist?.value;
       this.user_info.hight = this.hight?.value;
       this.user_info.inseam = this.inseam?.value;
       this.user_info.shoulder = this.shoulder?.value;
       this.user_info.sleeve = this.sleeve?.value;
       this.user_info.collar = this.collar?.value;
       this.eve = this.api
       .update_customer_info(this.user_info.id, this.user_info)
       .subscribe();
      }
  }

  formValidation(){
    this.editForm=new FormGroup({
      name:new FormControl(this.user_info.name,
      [
        Validators.required,
        Validators.minLength(3),
      ]),
      email:new FormControl(this.user_info.email,
      [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
      phone:new FormControl(this.user_info.phone,
      [
        Validators.required,
        Validators.pattern('^01[0-2,5]{1}[0-9]{8}$'),
      ]),
      gender:new FormControl(this.user_info.gender),
      chest:new FormControl(this.user_info.chest,
        [
          Validators.required,
          Validators.min(1),
        ]),

      armLength:new FormControl(this.user_info.armLength,
      [
        Validators.required,
        Validators.min(1),
      ]),
      waist:new FormControl(this.user_info.waist,
      [
        Validators.required,
        Validators.min(1),
      ]),
      hight:new FormControl(this.user_info.hight,
      [
        Validators.required,
        Validators.min(1),
      ]),

      inseam:new FormControl(this.user_info.inseam,
      [
        Validators.required,
        Validators.min(1),
      ]),
      shoulder:new FormControl(this.user_info.shoulder,
      [
        Validators.required,
        Validators.min(1),
      ]),
      sleeve:new FormControl(this.user_info.sleeve,
      [
        Validators.required,
        Validators.min(1),
      ]),
      collar:new FormControl(this.user_info.collar,
      [
        Validators.required,
        Validators.min(1),
      ]),

    })
  }
  get phone() {
    return this.editForm.get('phone');
  }
  get email() {
    return this.editForm.get('email');
  }
  get name() {
    return this.editForm.get('name');
  }
  get gender() {
    return this.editForm.get('gender');
  }
  get shoulder() {
    return this.editForm.get('shoulder');
  }
  get chest() {
    return this.editForm.get('chest');
  }
  get armLength() {
    return this.editForm.get('armLength');
  }
  get waist() {
    return this.editForm.get('waist');
  }
  get hight() {
    return this.editForm.get('hight');
  }
  get inseam() {
    return this.editForm.get('inseam');
  }
  get collar() {
    return this.editForm.get('collar');
  }
  get sleeve() {
    return this.editForm.get('sleeve');
  }


  ngOnDestroy(): void {
    if (this.eve != undefined) this.eve.unsubscribe();
  }
}
