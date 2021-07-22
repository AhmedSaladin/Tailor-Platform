import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { BindingService } from 'src/app/services/binding/binding.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit, OnDestroy {
  customer: any;
  users: any;
  id: any;
  formValidation: any;
  eve!: Subscription;

  constructor(
    private customerServive: CustomerService,
    private formBuilder: FormBuilder,
    private tostr: ToastrService,
    private binding: BindingService
  ) {}

  ngOnInit(): void {
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
    this.get_customers();
  }

  get getControl() {
    return this.formValidation.controls;
  }

  AddCustomer(form: NgForm) {
    const customer = {
      name: form.value.fname + ' ' + form.value.lname,
      phone: form.value.phone,
      email: form.value.email,
      password: form.value.password,
    };
    this.customerServive.signUp(customer).subscribe(
      () => {
        this.tostr.success('Customer added successfully', 'Success', {
          positionClass: 'toast-top-center',
        });
        this.get_customers();
      },
      (err) => {
        this.if_error(err);
      }
    );
    form.reset();
  }

  getCustomer(id: any) {
    this.customerServive.get_customer_info_id(id).subscribe(
      (res) => {
        this.customer = res;
      },
      (err) => {
        this.if_error(err);
      }
    );
  }

  deleteCustomer(id: any) {
    const yes = confirm('Do you want delete this Customer');
    if (yes) {
      this.customerServive.delete_cutomer(id).subscribe(
        () => {
          this.tostr.success('Customer deleted successfully', 'Success', {
            positionClass: 'toast-top-center',
          });
          this.get_customers();
        },
        (err) => {
          this.if_error(err);
        }
      );
    }
  }

  get_customers() {
    this.eve = this.customerServive.get_all_customers().subscribe(
      (res) => {
        this.users = res;
      },
      (err) => {
        this.if_error(err);
      }
    );
  }

  if_error(err: any) {
    this.binding.changeLoading(false);
    this.tostr.error(err, 'Error', { positionClass: 'toast-top-center' });
  }
  ngOnDestroy(): void {
    if (this.eve != undefined) this.eve.unsubscribe();
  }
}
