import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  constructor(private api: CustomerService) { }

  ngOnInit(): void {
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


  updateCustInfo(user: NgForm) {
    this.user_info.name = user.value.name;
    this.user_info.email = user.value.email;
    this.user_info.phone = user.value.phone;
    this.user_info.gender = user.value.gender;
    this.eve = this.api
      .update_customer_info(this.user_info.id, this.user_info)
      .subscribe();
  }


  ngOnDestroy(): void {
    if (this.eve != undefined) this.eve.unsubscribe();
  }
}
