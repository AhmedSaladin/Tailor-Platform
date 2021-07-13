import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  formValidation: any;

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
    });
  }

  get getControl() {
    return this.formValidation.controls;
  }


  AddCustomer(form: NgForm) {
    let customer = {
      name: form.value.fname + ' ' + form.value.lname,
      phone: form.value.phone,
      email: form.value.email,
      password: form.value.password,
      IsTailor: false,
    };
    // if (
    //   this.formValidation.controls.fname.valid &&
    //   this.formValidation.controls.lname.valid &&
    //   this.formValidation.controls.email.valid &&
    //   this.formValidation.controls.password.valid
    // ) {
      this.myCustomer.AddNewCustomer(customer).subscribe();
      this.router.navigateByUrl('login');
    // } else {
    //   alert('Enter Valid Data');
    // }
  }
}
