import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Tailor } from '../components/shared/models';
import { BindingService } from './binding/binding.service';

@Injectable({
  providedIn: 'root',
})
export class TailorService {
  private url = 'http://localhost:3000/api/tailors';
  constructor(private http: HttpClient, private binding: BindingService) {}
  get_tailors_info(limit: number, page: number) {
    this.binding.changeLoading(true);
    return this.http
      .get<{ tailors: Array<Tailor>; totalPages: number }>(
        `${this.url}?page=${page}&limit=${limit}`
      )
      .pipe(
        catchError(this.handleError),
        tap(() => {
          this.binding.changeLoading(false);
        })
      );
  }

  get_tailor_search(tailorName: string) {
    this.binding.changeLoading(true);
    return this.http
      .get<Array<Tailor>>(`${this.url}/search?name=${tailorName}`, {
        observe: 'response',
      })
      .pipe(
        catchError(this.handleError),
        tap(() => {
          this.binding.changeLoading(false);
        })
      );
  }

  get_tailors_info_filter(filter: any) {
    return this.http.get(`${this.url}/filter?${filter}`, {
      observe: 'response',
    });
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
    this.binding.changeLoading(true);
    return this.http.post(this.url, tailor).pipe(
      catchError(this.handleError),
      tap(() => this.binding.changeLoading(false))
    );
  }

  deleteTailor(id: any) {
    this.binding.changeLoading(true);
    return this.http.delete(`${this.url}/${id}`, { observe: 'response' }).pipe(
      catchError(this.handleError),
      tap(() => this.binding.changeLoading(false))
    );
  }

  deleteSingleImg(imgURL: any, id: any) {
    this.binding.changeLoading(true);
    return this.http
      .delete(`${this.url}/?img=${imgURL}&id=${id}`, { observe: 'response' })
      .pipe(
        catchError(this.handleError),
        tap(() => this.binding.changeLoading(false))
      );
  }

  private handleError(err: HttpErrorResponse) {
    if (err.error.message == 'Invalid ID.')
      return throwError('Tailor not found');
    return throwError(err.error.message);
  }
}
