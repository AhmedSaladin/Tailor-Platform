import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TailorService } from 'src/app/services/tailor.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
// form need validation

@Component({
  selector: 'app-tailor-about',
  templateUrl: './tailor-about.component.html',
  styleUrls: ['./tailor-about.component.css'],
})
export class TailorAboutComponent implements OnInit, OnDestroy {
  @Input() user_info: any;
  eve: any;
  formValidation: any;
  constructor(private api: TailorService, public formBulider: FormBuilder) {}

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

  update_tailor_about_section(about: string) {
    this.user_info.about = about;
    this.eve = this.api
      .update_tailor_info(this.user_info.id, this.user_info)
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.eve != undefined) this.eve.unsubscribe();
  }
}
