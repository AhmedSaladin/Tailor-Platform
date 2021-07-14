import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';
import { CustomerService } from './customer.service';

@Injectable()
export class TokenIntercetorService implements HttpInterceptor {
  constructor(private customer: CustomerService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // exhaustMap  map to inner observable, ignore other values until that observable completes.
    this.customer.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) return next.handle(req);
        const newRequst = req.clone({
          headers: new HttpHeaders().set('authorization', `${user.Token}`),
        });
        return next.handle(newRequst);
      })
    );
    return next.handle(req);
  }
}
