import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UcWidgetComponent } from 'ngx-uploadcare-widget';
import { Subscription } from 'rxjs';
import { BindingService } from 'src/app/services/binding/binding.service';
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
  formValidation!: FormGroup;
  @Input() currentUserId: any;
  constructor(
    private api: TailorService,
    public formBulider: FormBuilder,
    private apiComment: CommentService,
    private tostr: ToastrService,
    private biniding: BindingService
  ) {}

  update_tailor_info(form: FormGroup) {
    if (form.pristine) return;
    this.user_info.name = form.value.name;
    this.user_info.designFor = form.value.design;
    const { name, designFor } = this.user_info;
    this.eve = this.api
      .update_tailor_info(this.user_info._id, { name, designFor })
      .subscribe(
        () => {
          this.tostr.success(
            'Your information updated successfully',
            'Success'
          );
        },
        (err) => {
          this.error_handler(err);
          this.reset_form(form);
        }
      );
  }
  ngOnInit(): void {
    this.formValidation = this.formBulider.group({
      name: [
        `${this.user_info.name}`,
        [Validators.required, Validators.minLength(7)],
      ],
      design: [`${this.user_info.designFor}`, Validators.required],
    });
    this.displayRate(this.user_info.rate);

  }

  get getControl() {
    return this.formValidation.controls;
  }

  on_upload_complete(event: any) {
    this.img = event.cdnUrl;
  }

  save_new_tailor_avatar() {
    if (this.user_info.avatar != this.img) {
      this.user_info.avatar = this.img;
      const { avatar } = this.user_info;
      this.eve = this.api
        .update_tailor_info(this.user_info._id, { avatar })
        .subscribe(
          () => {
            this.tostr.success(
              'Your profile image updated successfully',
              'Success'
            );
          },
          (err) => {
            this.error_handler(err);
          }
        );
    }
    this.upload_component.clearUploads();
  }

  not_saving_tailor_avatar() {
    if (this.img != this.user_info.avatar) this.img = this.user_info.avatar;
    this.upload_component.clearUploads();
  }

  // review: any;
  // get_tailor_rate() {
  //   this.eve = this.apiComment
  //     .getTailorRate(this.user_info._id)
  //     .subscribe((res) => {
  //       this.review = res.body;
  //       if (this.review.length == 0) {
  //         this.review[0] = {
  //           count: 0,
  //           rate: 5,
  //         };
  //       }
  //       this.review = this.review[0];
  //       this.displayRate(this.review.rate);
  //     });
  // }

  // starsTotal = 5;
  myStyle: any = {};
  displayRate(rate: any) {
    const starPercentage = (rate / 5) * 100;
    // Round to nearest 10
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
    this.myStyle = { width: starPercentageRounded };
  }

  reset_form(form: FormGroup) {
    form.setValue({
      name: this.user_info.name,
      design: this.user_info.designFor,
    });
  }

  error_handler(err: any) {
    this.biniding.changeLoading(false);
    this.tostr.error(err, 'Error');
  }

  ngOnDestroy(): void {
    if (this.eve != undefined) this.eve.unsubscribe();
  }
}
