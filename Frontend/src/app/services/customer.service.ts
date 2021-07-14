import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Customer, UserSchema } from '../components/shared/models';
import { User } from './user.model';

interface Login {
  token: String;
  id: String;
  isTailor: Boolean;
}
@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}
  // BehaviourSubject will return the initial value or the current value on Subscription
  // Subject does not return the current value on Subscription. It triggers only on .next(value) call and return/output the value
  user = new BehaviorSubject<User | null>(null);
  private BaseUrl = 'http://localhost:3000/users';
  private URL = 'https://tailor-s.herokuapp.com/api/users';

  signUp(user: Customer) {
    return this.http
      .post(`${this.URL}/signup`, user, {
        observe: 'response',
      })
      .pipe(catchError(this.handleError));
  }

  login(user: UserSchema) {
    return this.http
      .post<Login>(`${this.URL}/login`, user, {
        observe: 'response',
      })
      .pipe(
        catchError(this.handleError),
        tap((res) => {
          const user = new User(
            res.body!.id,
            res.body!.isTailor,
            res.body!.token
          );
          this.user.next(user);
        })
      );
  }

  getCustomerInfo() {
    return this.http.get(this.BaseUrl);
  }

  getCustomerInfoByID(id: number) {
    return this.http.get(`${this.BaseUrl}/${id}`);
  }

  updateCustomerInfo(id: number, customer: any) {
    return this.http.put(`${this.BaseUrl}/${id}`, customer);
  }

  get_customer_info_id(id: any) {
    return this.http.get(`${this.URL}/${id}`, {
      observe: 'response',
    });
  }

  update_customer_info(id: any, body: any) {
    return this.http.put(`${this.BaseUrl}/${id}`, body, {
      observe: 'response',
    });
  }

  deleteCustomer(id: any) {
    return this.http.delete(`${this.BaseUrl}/${id}`, {
      observe: 'response',
    });
  }

  private handleError(err: HttpErrorResponse) {
    if (err.error.message == 'NOT FOUND')
      return throwError('Email or Password wrong.');
    if (!err.error.message) return throwError('Somthing went wrong.');
    return throwError(err.error.message);
  }
}
