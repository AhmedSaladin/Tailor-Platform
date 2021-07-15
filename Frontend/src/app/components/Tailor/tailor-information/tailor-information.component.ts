import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { UcWidgetComponent } from 'ngx-uploadcare-widget';
import { Subscription } from 'rxjs';
import { TailorService } from 'src/app/services/tailor.service';
@Component({
  selector: 'app-tailor-information',
  templateUrl: './tailor-information.component.html',
  styleUrls: ['./tailor-information.component.css'],
})
export class TailorInformationComponent implements OnInit, OnDestroy {
  @ViewChild('upload_component') upload_component!: UcWidgetComponent;
  @Input() user_info: any;
  @Input() img: any;
  eve!: Subscription;
  formValidation: any;
  @Input() currentUserId: any;
  constructor(private api: TailorService, public formBulider: FormBuilder) {}

  update_tailor_info(user: NgForm) {
    this.user_info.name = user.value.name;
    this.user_info.designFor = user.value.design;
    this.eve = this.api
      .update_tailor_info(this.user_info.id, this.user_info)
      .subscribe();
  }

  ngOnInit(): void {
    this.formValidation = this.formBulider.group({
      name: [
        `${this.user_info.name}`,
        [Validators.required, Validators.minLength(3)],
      ],
      design: [`${this.user_info.designFor}`, Validators.required],
    });
  }

  get getControl() {
    return this.formValidation.controls;
  }

  on_upload_complete(event: any) {
    this.img = event.cdnUrl;
  }

  save_new_tailor_avatar() {
    this.user_info.avatar = this.img;
    this.eve = this.api
      .update_tailor_info(this.user_info.id, this.user_info)
      .subscribe();
    this.upload_component.clearUploads();
  }

  not_saving_tailor_avatar() {
    if (this.img != this.user_info.avatar) this.img = this.user_info.avatar;
    this.upload_component.clearUploads();
  }

  ngOnDestroy(): void {
    if (this.eve != undefined) this.eve.unsubscribe();
  }
}
