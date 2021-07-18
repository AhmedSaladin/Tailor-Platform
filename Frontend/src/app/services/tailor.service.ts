import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { BindingService } from './binding/binding.service';

@Injectable({
  providedIn: 'root',
})
export class TailorService {
  private url = 'http://localhost:3000/api/tailors/';
  constructor(private http: HttpClient, private binding: BindingService) {}
  get_tailors_info() {
    return this.http.get(this.url, { observe: 'response' });
  }
  get_tailors_info_filter(filter: any) {
    return this.http.get(`${this.url}?${filter}`, { observe: 'response' });
  }
  get_tailor_info(id: any) {
    return this.http.get(`${this.url}/${id}`, { observe: 'response' });
  }
  update_tailor_info(id: any, body: any) {
    return this.http.patch(`${this.url}/${id}`, body, { observe: 'response' });
  }
  AddNewTailor(tailor: any) {
    return this.http.post(this.url, tailor);
  }
  deleteTailor(id: any) {
    return this.http.delete(`${this.url}/${id}`, { observe: 'response' });
  }
  getTailorsInfo() {
    this.binding.changeLoading(true);
    return this.http
      .get(this.url)
      .pipe(tap((res) => this.binding.changeLoading(false)));
  }
}
