import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  constructor(private myCustomer: CustomerService) {}

  ngOnInit(): void {}

  formValidation = new FormGroup({
    fname: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9_-]{8,15}$'),
    ]),
    lname: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9_-]{8,15}$'),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
      ),
    ]),
  });

  get fnameValid() {
    return this.formValidation.controls.fname.valid;
  }
  get lnameValid() {
    return this.formValidation.controls.lname.valid;
  }
  get emailValid() {
    return this.formValidation.controls.email.valid;
  }
  get passwordValid() {
    return this.formValidation.controls.password.valid;
  }

  AddCustomer(fname: any, lname: any, email: any, password: any) {
    let isTailor: any;
    let customer = {
      fname: fname,
      lname: lname,
      email: email,
      password: password,
      IsTailor: false,
    };

    this.myCustomer.AddNewCustomer(customer).subscribe();
    console.log(this.formValidation);
  }
}
