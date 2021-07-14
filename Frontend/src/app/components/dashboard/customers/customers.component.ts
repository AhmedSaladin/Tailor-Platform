import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  customer: any;
  users: any;
  isTailor = false;
  filteredUsers: any;
  id: any;
  formValidation: any;

  constructor(
    private customerServive: CustomerService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.customerServive.getCustomerInfo().subscribe(
      (res) => {
        this.users = res;
      },
      (err) => {
        console.log(err);
      }
    );

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
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$'
          ),
        ],
      ],
    });
  }

  get getControl() {
    return this.formValidation.controls;
  }

  AddCustomer(form: NgForm) {
    console.log(form);
    const customer = {
      name: form.value.fname + ' ' + form.value.lname,
      phone: form.value.phone,
      email: form.value.email,
      password: form.value.password,
    };
    this.customerServive.signUp(customer).subscribe();
    form.reset();
  }

  getCustomer(id: any) {
    return this.customerServive.get_customer_info_id(id).subscribe(
      (res) => (this.customer = res.body),
      (err) => console.log(err)
    );
  }

  deleteCustomer(id: any) {
    return this.customerServive.deleteCustomer(id).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
//  need some cleanup & unsubscrip to improve performanc
//  adding auth and authGurd make it work only with admin
//  link it with production api
