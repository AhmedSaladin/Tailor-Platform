import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { BindingService } from './binding/binding.service';
import { CustomerService } from './customer.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private url = 'http://localhost:3000/orders';
  private urlBack = 'http://localhost:3000/api/orders';

  constructor(
    private http: HttpClient,
    private user: CustomerService,
    private binding: BindingService
  ) {}

  get_current_user_orders() {
    const userId = this.user.user.value?.Id;
    if (this.user.user.value?.IsTailor)
      return this.http.get(`${this.urlBack}/tailor-orders/${userId}`, {
        observe: 'response',
      });
    return this.http.get(`${this.urlBack}/customer-orders/${userId}`, {
      observe: 'response',
    });
  }

  get_tailor_requests(id: any) {
    return this.http.get(`${this.url}?tailor_id=${id}`, {
      observe: 'response',
    });
  }

  get_customer_requests(id: any) {
    return this.http.get(`${this.url}?customer_id=${id}`, {
      observe: 'response',
    });
  }

  get_tailor_request(id: any) {
    return this.http.get(`${this.url}/${id}`, { observe: 'response' });
  }

  create_new_order(order: any) {
    return this.http.post(this.urlBack, order, { observe: 'response' });
  }

  update_status(state: string, id: string) {
    return this.http.patch(
      `${this.urlBack }/${id}`,
      { status: state },
      { observe: 'response' }
    );
  }

  getOrder() {
    this.binding.changeLoading(true);
    return this.http
      .get(this.urlBack)
      .pipe(tap((res) => this.binding.changeLoading(false)));
  }

  getOrderById(id: string) {
    this.binding.changeLoading(true);
    return this.http
      .get(`${this.urlBack}/${id}`, { observe: 'response' })
      .pipe(tap((res) => this.binding.changeLoading(false)));
  }

  deleteOrder(id: any) {
    return this.http.delete(`${this.urlBack}/${id}`, {
      observe: 'response',
    });
  }
}
