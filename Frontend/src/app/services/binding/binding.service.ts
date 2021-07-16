import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BindingService {

  constructor() { }

  private loading = new BehaviorSubject<Boolean> (false);
  isLoading = this.loading.asObservable();

  changeLoading(state: Boolean) {
    this.loading.next(state)
  }


}
