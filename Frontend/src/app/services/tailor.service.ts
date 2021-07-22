import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Tailor } from '../components/shared/models';
import { BindingService } from './binding/binding.service';

@Injectable({
  providedIn: 'root',
})
export class TailorService {
  private url = 'http://localhost:3000/api/tailors';
  constructor(private http: HttpClient, private binding: BindingService) {}
  get_tailors_info() {
    this.binding.changeLoading(true);
    return this.http.get<Array<Tailor>>(this.url, { observe: 'response' }).pipe(
      catchError(this.handleError),
      tap((res) => {
        this.binding.changeLoading(false);
      })
    );
  }

  get_tailors_info_filter(filter: any) {
    return this.http.get(`${this.url}?${filter}`, { observe: 'response' });
  }

  get_tailor_info(id: any) {
    this.binding.changeLoading(true);
    return this.http.get(`${this.url}/${id}`, { observe: 'response' }).pipe(
      catchError(this.handleError),
      tap(() => this.binding.changeLoading(false))
    );
  }

  update_tailor_info(id: any, body: any) {
    this.binding.changeLoading(true);
    return this.http
      .patch(`${this.url}/${id}`, body, { observe: 'response' })
      .pipe(
        catchError(this.handleError),
        tap(() => this.binding.changeLoading(false))
      );
  }

  AddNewTailor(tailor: any) {
    return this.http.post(this.url, tailor).pipe(catchError(this.handleError));
  }

  deleteTailor(id: any) {
    return this.http
      .delete(`${this.url}/${id}`, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  deleteSingleImg(imgURL: any) {
    return this.http
      .delete(`${this.url}/?img=${imgURL}`, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    if (err.error.message == 'Invalid ID.')
      return throwError('Tailor not found');
    return throwError(err.error.message);
  }
}
