import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TailorService } from 'src/app/services/tailor.service';

@Component({
  selector: 'app-tailor-information',
  templateUrl: './tailor-information.component.html',
  styleUrls: ['./tailor-information.component.css'],
})
export class TailorInformationComponent implements OnInit, OnDestroy {
  @Input() user_info: any;
  @Input() img: any;
  eve: any;
  constructor(private api: TailorService) {}

  update_tailor_info(user: NgForm) {
    this.user_info.name = user.value.name;
    this.user_info.designFor = user.value.design;
    this.eve = this.api
      .update_tailor_info(this.user_info.id, this.user_info)
      .subscribe();
  }

  ngOnInit(): void {}

  on_upload_complete(event: any) {
    this.img = event.cdnUrl;
    console.log(event);
    event = null;
  }

  save_new_tailor_avatar() {
    this.user_info.avatar = this.img;
    this.eve = this.api
      .update_tailor_info(this.user_info.id, this.user_info)
      .subscribe();
  }

  not_saving_tailor_avatar() {
    if (this.img != this.user_info.avatar) this.img = this.user_info.avatar;
  }

  ngOnDestroy(): void {
    this.eve.unsubscribe();
  }
}
