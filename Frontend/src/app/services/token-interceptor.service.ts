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
    return this.customer.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) return next.handle(req);
        const newReq = req.clone({
          headers: req.headers.append('authorization', `Bearer ${user.Token}`),
        });
        return next.handle(newReq);
      })
    );
  }
}
