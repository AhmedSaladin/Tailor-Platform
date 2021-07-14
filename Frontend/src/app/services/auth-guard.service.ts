import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerService } from './customer.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuardService implements CanActivate {
//   constructor(private customer: CustomerService) {}
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     router: RouterStateSnapshot
//   ): Boolean | Promise<Boolean> | Observable<Boolean> {
//     return this.customer.user;
//   }
// }
