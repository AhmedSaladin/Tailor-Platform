import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerService } from './customer.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private url = 'http://localhost:3000/orders';
  constructor(private http: HttpClient, private user: CustomerService) {}

  get_current_user_orders() {
    const userId = this.user.user.value?.Id;
    return this.http.get(`${this.url}?customer_id=${userId}`, {
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
    return this.http.post(this.url, order, { observe: 'response' });
  }

  update_status(state: string, id: string) {
    return this.http.patch(
      `${this.url}/${id}`,
      { status: state },
      { observe: 'response' }
    );
  }

  getOrder() {
    return this.http.get(this.url);
  }

  deleteOrder(id: any) {
    return this.http.delete(`${this.url}/${id}`, { observe: 'response' });
  }
}
