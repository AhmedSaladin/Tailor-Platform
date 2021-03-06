import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  LoginForm!: FormGroup;
  eve!: Subscription;
  isLoading: Boolean = false;
  error!: string;

  constructor(private user: CustomerService, private router: Router) {}

  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get getControl() {
    return this.LoginForm.controls;
  }

  onSubmit(form: FormGroup) {
    if (!form.valid) {
      this.error = 'Please enter your password and email';
      return;
    }
    this.isLoading = true;
    this.eve = this.user.login(form.value).subscribe(
      (res) => {
        this.isLoading = false;
        const tailor = res?.isTailor;
        if (tailor) this.router.navigate([`/tailor/${res?.id}`]);
        else this.router.navigate(['home']);
      },
      (err) => {
        this.isLoading = false;
        this.error = err;
      }
    );
    form.reset();
  }

  ngOnDestroy(): void {
    if (this.eve) this.eve.unsubscribe();
  }
}
