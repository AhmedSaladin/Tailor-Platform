import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TailorService {
  private url = 'http://localhost:3000/users';
  constructor(private http: HttpClient) {}
  get_tailors_info() {
    return this.http.get(this.url, { observe: 'response' });
  }
  get_tailor_info(id: any) {
    return this.http.get(`${this.url}/${id}`, { observe: 'response' });
  }
  update_tailor_info(id: any, body: any) {
    return this.http.put(`${this.url}/${id}`, body, { observe: 'response' });
  }
  get_tailor_info_by_email(email: any) {
    return this.http.get(`${this.url}/?email=${email}`, {
      observe: 'response',
    });
  }
  get_tailor_info_by_name(name: any) {
    return this.http.get(`${this.url}/?name=${name}`, {
      observe: 'response',
    });
  }
  get_tailor_info_by_designFor(designFor: any) {
    if (designFor == 'all') {
      return this.http.get(`${this.url}/?isTailor=true`, {
        observe: 'response',
      });
    } else {
      return this.http.get(
        `${this.url}/?isTailor=true&designFor=${designFor}`,
        { observe: 'response' }
      );
    }
  }
}
