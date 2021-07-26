import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Order } from '../components/shared/models';
import { BindingService } from './binding/binding.service';
import { CustomerService } from './customer.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private urlBack = 'http://localhost:3000/api/orders';

  constructor(
    private http: HttpClient,
    private user: CustomerService,
    private binding: BindingService
  ) {}

  get_current_user_orders(page: number) {
    const tlimit: number = 5;
    const ulimit: number = 4;

    const userId = this.user.user.value?.Id;
    if (this.user.user.value?.IsTailor)
      return this.http.get<{
        orders: Array<Order>;
        totalPages: number;
      }>(
        `${this.urlBack}/tailor-orders/${userId}?page=${page}&limit=${tlimit}`
      );
    return this.http.get<{
      orders: Array<Order>;
      totalPages: number;
    }>(
      `${this.urlBack}/customer-orders/${userId}?page=${page}&limit=${ulimit}`
    );
  }

  create_new_order(order: any) {
    return this.http.post(this.urlBack, order, { observe: 'response' });
  }

  update_status(state: string, id: string) {
    return this.http.patch(
      `${this.urlBack}/${id}`,
      { status: state },
      { observe: 'response' }
    );
  }
  update_comment(comment: any, id: string) {
    return this.http.patch(
      `${this.urlBack}/comments/${id}`,
      { comment: comment },
      { observe: 'response' }
    );
  }

  getOrders(page: number) {
    const limit: number = 5;
    this.binding.changeLoading(true);
    return this.http
      .get<{
        orders: Array<Order>;
        totalPages: number;
      }>(`${this.urlBack}?page=${page}&limit=${limit}`)
      .pipe(tap(() => this.binding.changeLoading(false)));
  }

  getOrderById(id: string) {
    this.binding.changeLoading(true);
    return this.http
      .get(`${this.urlBack}/${id}`, { observe: 'response' })
      .pipe(tap(() => this.binding.changeLoading(false)));
  }

  deleteOrder(id: any) {
    return this.http.delete(`${this.urlBack}/${id}`, {
      observe: 'response',
    });
  }
  update_price(price: any,deliveryDare:any,status:any, id: string) {
    return this.http.patch(
      `${this.urlBack }/price/${id}`,
      {
        price: price ,
        deliveryDare:deliveryDare,
        status: status,
      },
      { observe: 'response' }
    );
  }
}
