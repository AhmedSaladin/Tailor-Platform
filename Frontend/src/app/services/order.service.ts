import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private url = 'http://localhost:3000/orders';
  constructor(private http: HttpClient) {}
  get_tailor_requests(id: any) {
    return this.http.get(`${this.url}?tailor_id=${id}`, {
      observe: 'response',
    });
  }
  get_tailor_request(id: any) {
    return this.http.get(`${this.url}/${id}`, { observe: 'response' });
  }
}
