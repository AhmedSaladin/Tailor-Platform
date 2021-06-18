import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:3000/users';
  constructor(private http: HttpClient) {}
  loginByEmail(email: any) {
    return this.http.get(`${this.url}/?email=${email}`, {
      observe: 'response',
    });
  }
}
