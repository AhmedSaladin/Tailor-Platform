import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { UcWidgetComponent } from 'ngx-uploadcare-widget';
import { Subscription } from 'rxjs';
import { CommentService } from 'src/app/services/comment.service';
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
  constructor(
    private api: TailorService,
    public formBulider: FormBuilder,
    private apiComment: CommentService
  ) {}

  update_tailor_info(user: NgForm) {
    this.user_info.name = user.value.name;
    this.user_info.designFor = user.value.design;
    const { name, designFor } = this.user_info;
    this.eve = this.api
      .update_tailor_info(this.user_info._id, { name, designFor })
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
    this.get_tailor_rate();
  }

  get getControl() {
    return this.formValidation.controls;
  }

  on_upload_complete(event: any) {
    this.img = event.cdnUrl;
  }

  save_new_tailor_avatar() {
    this.user_info.avatar = this.img;
    const { avatar } = this.user_info;
    this.eve = this.api
      .update_tailor_info(this.user_info._id, { avatar })
      .subscribe();
    this.upload_component.clearUploads();
  }

  not_saving_tailor_avatar() {
    if (this.img != this.user_info.avatar) this.img = this.user_info.avatar;
    this.upload_component.clearUploads();
  }
  ///////////////////////get tailor rate//////////////////////////////////
  review: any;
  get_tailor_rate() {
    this.eve = this.apiComment
      .getTailorRate(this.user_info.id)
      .subscribe((res) => {
        this.review = res.body;
        if (this.review.length == 0) {
          this.review[0] = {
            count: 0,
            rate: 5,
          };
          console.log(this.review);
        }
        this.review = this.review[0];
        this.displayRate(this.review.rate);
      });
  }

  ///////////////displayRate//////////////////////
  starsTotal = 5;
  myStyle: any = {};
  displayRate(rate: any) {
    const starPercentage = (rate / 5) * 100;
    // Round to nearest 10
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
    this.myStyle = { width: starPercentageRounded };
    console.log(this.myStyle);
    // Add number rating
    // document.querySelector(`.${rating} .number-rating`).innerHTML = ratings[rating];
  }

  ////////////////////////////////////
  ngOnDestroy(): void {
    if (this.eve != undefined) this.eve.unsubscribe();
  }
}
