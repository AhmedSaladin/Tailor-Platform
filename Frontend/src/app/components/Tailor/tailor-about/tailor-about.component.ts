import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TailorService } from 'src/app/services/tailor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { BindingService } from 'src/app/services/binding/binding.service';

@Component({
  selector: 'app-tailor-about',
  templateUrl: './tailor-about.component.html',
  styleUrls: ['./tailor-about.component.css'],
})
export class TailorAboutComponent implements OnInit, OnDestroy {
  @Input() user_info: any;
  eve!: Subscription;
  formValidation!: FormGroup;
  @Input() currentUserId: any;
  constructor(
    private api: TailorService,
    private formBulider: FormBuilder,
    private tostr: ToastrService,
    private biniding: BindingService
  ) {}

  ngOnInit(): void {
    this.formValidation = this.formBulider.group({
      about: [
        `${this.user_info.about}`,
        [Validators.required, Validators.minLength(10)],
      ],
    });
  }

  get getControl() {
    return this.formValidation.controls;
  }

  update_tailor_about_section(form: FormGroup) {
    if (form.pristine) return;
    this.user_info.about = form.value.about;
    this.eve = this.api
      .update_tailor_info(this.user_info._id, { about: this.user_info.about })
      .subscribe(
        () => {
          this.tostr.success(
            'Your about me section updated successfully',
            'Success'
          );
        },
        (err) => {
          this.biniding.changeLoading(false);
          this.tostr.error(err, 'Error');
        }
      );
  }

  ngOnDestroy(): void {
    if (this.eve != undefined) this.eve.unsubscribe();
  }
}
