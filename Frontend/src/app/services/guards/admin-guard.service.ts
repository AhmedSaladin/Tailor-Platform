import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { CustomerService } from '../customer.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuardService {
  constructor(private customer: CustomerService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.customer.user.pipe(
      take(1),
      map((user) => {
        const admin = user?.Admin;
        if (!admin) return this.router.createUrlTree(['notfound']);
        return true;
      })
    );
  }
}
