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
  isLoading: Boolean = false;
  error!: string;
  constructor(
    private myCustomer: CustomerService,
    private router: Router,
    private formBulider: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formValidation = this.formBulider.group({
      fname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[A-Z-a-z0-9_ -]{3,10}$'),
        ],
      ],
      lname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[A-Z-a-z0-9_ -]{3,10}$'),
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
          Validators.maxLength(11),
          Validators.minLength(11),
          Validators.pattern('^(010|011|012|015)[0-9]{8}$'),
        ],
      ],
    });
  }

  get getControl() {
    return this.formValidation.controls;
  }

  AddCustomer(form: FormGroup) {
    if (!form.valid) {
      this.error = 'Enter a valid data.';
      return;
    }
    const customer = {
      name: form.value.fname + ' ' + form.value.lname,
      phone: form.value.phone,
      email: form.value.email,
      password: form.value.password,
    };
    this.isLoading = true;
    this.eve = this.myCustomer.signUp(customer).subscribe(
      () => {
        this.isLoading = false;
        this.router.navigateByUrl('login');
      },
      (err) => {
        this.isLoading = false;
        if (err.includes('E11000 '))
          this.error = 'Phone number is already used.';
        else this.error = err;
      }
    );
    form.reset();
  }
  ngOnDestroy(): void {
    if (this.eve) this.eve.unsubscribe();
  }
}
