import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  formValidation!: FormGroup;
  eve!: Subscription;
  constructor(
    private myCustomer: CustomerService,
    private router: Router,
    public formBulider: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formValidation = this.formBulider.group({
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
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-_]).{8,}$'
          ),
        ],
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^(010|011|012|015)[0-9]{8}$'),
        ],
      ],
    });
  }

  get getControl() {
    return this.formValidation.controls;
  }

  AddCustomer(form: FormGroup) {
    const customer = {
      name: form.value.fname + ' ' + form.value.lname,
      email: form.value.email,
      password: form.value.password,
      phone: form.value.phone,
    };
    // adding validation to check status from server if data sumbited well
    this.eve = this.myCustomer.AddNewCustomer(customer).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    this.router.navigateByUrl('login');
  }
  ngOnDestroy(): void {
    this.eve.unsubscribe();
  }
}
