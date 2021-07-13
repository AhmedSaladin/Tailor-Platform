import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Customer, User } from '../components/shared/models';

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

  private BaseUrl = 'http://localhost:3000/users';
  private URL = 'https://tailor-s.herokuapp.com/api/users';

  signUp(user: Customer) {
    return this.http
      .post(`${this.URL}/signup`, user, {
        observe: 'response',
      })
      .pipe(
        catchError((err) => {
          if (!err.error.message) return throwError('Somthing went wrong.');
          return throwError(err.error.message);
        })
      );
  }

  login(user: User) {
    return this.http
      .post<Login>(`${this.URL}/login`, user, {
        observe: 'response',
      })
      .pipe(
        catchError((err) => {
          if (err.error.message == 'NOT FOUND')
            return throwError('Email or Password wrong.');
          return throwError('Somthing went wrong.');
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
    return this.http.get(`${this.BaseUrl}/${id}`, {
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
}
