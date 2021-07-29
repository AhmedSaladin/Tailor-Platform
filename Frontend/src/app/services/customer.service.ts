import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CustomerSignup, UserLogin } from '../components/shared/models';
import { BindingService } from './binding/binding.service';
import { User as loginUser } from './user.model';
import { User } from '../components/shared/models';

export interface Login {
  token: String;
  id: String;
  isTailor: Boolean;
  admin: Boolean;
}
@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private binding: BindingService
  ) {}
  // BehaviourSubject will return the initial value or the current value on Subscription
  // Subject does not return the current value on Subscription. It triggers only on .next(value) call and return/output the value
  user = new BehaviorSubject<loginUser | null>(null);
  private URL = 'https://tailor-s.herokuapp.com/api/users';
  private test = 'http://localhost:3000/api/users';

  signUp(user: CustomerSignup) {
    return this.http
      .post(`${this.URL}/signup`, user)
      .pipe(catchError(this.handleError));
  }

  login(user: UserLogin) {
    return this.http.post<Login>(`${this.URL}/login`, user).pipe(
      catchError(this.handleError),
      tap((res) => {
        const user = new loginUser(
          res.id!,
          res.isTailor!,
          res.admin!,
          res.token!
        );
        this.user.next(user);
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('user') || 'null');
    // if user not found in local storage return
    if (userData === null) return;
    // if exist emiting him into app memory
    const loadedUser = new loginUser(
      userData.id,
      userData.isTailor,
      userData.admin,
      userData.token
    );
    if (loadedUser.Token) this.user.next(loadedUser);
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['login']);
    this.binding.changeLoading(false);
  }

  // remember to add autoLogout before token expire or request new token

  get_all_customers(page: number) {
    this.binding.changeLoading(true);
    const limit = 5;
    return this.http
      .get<{ totalPages: number; users: Array<User> }>(
        `${this.URL}?page=${page}&limit=${limit}`
      )
      .pipe(tap(() => this.binding.changeLoading(false)));
  }

  get_customer_info_id(id: any) {
    this.binding.changeLoading(true);
    return this.http.get<User>(`${this.URL}/${id}`).pipe(
      catchError(this.handleError),
      tap(() => this.binding.changeLoading(false))
    );
  }

  update_customer_info(id: string, body: any) {
    this.binding.changeLoading(true);
    return this.http
      .put(`${this.URL}/${id}`, body, {
        observe: 'response',
      })
      .pipe(
        catchError(this.handleError),
        tap(() => this.binding.changeLoading(false))
      );
  }

  delete_cutomer(id: any) {
    this.binding.changeLoading(true);
    return this.http.delete(`${this.URL}/${id}`).pipe(
      catchError(this.handleError),
      tap(() => this.binding.changeLoading(false))
    );
  }

  private handleError(err: HttpErrorResponse) {
    if (err.error.message == 'NOT FOUND')
      return throwError('Email or Password wrong.');
    else if (err.error.message.includes('phone'))
      return throwError('Phone number is linked to an existing account');
    else if (!err.error.message) return throwError('Somthing went wrong.');
    return throwError(err.error.message);
  }
}
