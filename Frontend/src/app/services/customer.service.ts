import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private api: HttpClient) {}

  private BaseUrl = 'http://localhost:3000/users';
  private URL = 'https://tailor-s.herokuapp.com/api/users/signup';

  AddNewCustomer(customer: any) {
    return this.api
      .post(this.URL, customer, {
        observe: 'response',
      })
      .pipe(
        catchError((err) => {
          if (!err.error.message) return throwError('Somthing went wrong.');
          return throwError(err.error.message);
        })
      );
  }

  getCustomerInfo() {
    return this.api.get(this.BaseUrl);
  }

  getCustomerInfoByID(id: number) {
    return this.api.get(`${this.BaseUrl}/${id}`);
  }

  updateCustomerInfo(id: number, customer: any) {
    return this.api.put(`${this.BaseUrl}/${id}`, customer);
  }

  get_customer_info_id(id: any) {
    return this.api.get(`${this.BaseUrl}/${id}`, {
      observe: 'response',
    });
  }

  update_customer_info(id: any, body: any) {
    return this.api.put(`${this.BaseUrl}/${id}`, body, {
      observe: 'response',
    });
  }

  deleteCustomer(id: any) {
    return this.api.delete(`${this.BaseUrl}/${id}`, {
      observe: 'response',
    });
  }
}
