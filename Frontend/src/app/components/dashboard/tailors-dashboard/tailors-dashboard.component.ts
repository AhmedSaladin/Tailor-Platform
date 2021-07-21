import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { TailorService } from 'src/app/services/tailor.service';
import { Tailor } from '../../shared/models';

@Component({
  selector: 'app-tailors-dashboard',
  templateUrl: './tailors-dashboard.component.html',
  styleUrls: ['./tailors-dashboard.component.css'],
})
export class TailorsDashboardComponant implements OnInit, OnDestroy {
  tailor: any;
  tailors!: Array<Tailor>;
  isTailor = true;
  id: any;
  formValidation: any;
  eve!: Subscription;

  constructor(
    private tailorServive: TailorService,
    private formBuilder: FormBuilder,
    private tostr: ToastrService
  ) {}

  ngOnInit(): void {
    this.get_tailors();
    this.formValidation = this.formBuilder.group({
      fname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[A-Z-a-z0-9_-]{3,10}$'),
        ],
      ],
      lname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[A-Z-a-z0-9_-]{3,10}$'),
        ],
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.minLength(11),
          Validators.pattern('^(010|011|012|015)[0-9]{8}$'),
        ],
      ],
      gender: ['', Validators.required],
      designFor: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*()-_]).{8,}$'
          ),
        ],
      ],
    });
  }

  get getControl() {
    return this.formValidation.controls;
  }

  AddTailor(form: NgForm) {
    console.log(form.value);
    let tailor = {
      name: form.value.fname + ' ' + form.value.lname,
      phone: form.value.phone,
      gender: form.value.gender,
      designFor: form.value.designFor,
      email: form.value.email,
      password: form.value.password,
    };
    this.tailorServive.AddNewTailor(tailor).subscribe(
      () => this.tostr.success('Tailor added successfully'),
      (err) => this.tostr.error(err)
    );
    form.reset();
  }

  getTailor(id: any) {
    this.tailorServive.get_tailor_info(id).subscribe(
      (res) => (this.tailor = res.body),
      (err) => this.tostr.error(err)
    );
  }

  deleteTailor(id: any) {
    this.tailorServive.deleteTailor(id).subscribe(
      () => {
        this.tostr.success('Tailor deleted successfully');
        this.tailors = this.tailors.filter((tailor) => tailor._id != id);
      },
      (err) => this.tostr.error(err)
    );
  }

  get_tailors() {
    this.eve = this.tailorServive.get_tailors_info().subscribe(
      (res) => {
        if (res.body == null) this.tailors = [];
        else this.tailors = res.body;
      },
      (err) => {
        this.tostr.error(err);
      }
    );
  }
  ngOnDestroy(): void {
    if (this.eve != undefined) this.eve.unsubscribe();
  }
}
