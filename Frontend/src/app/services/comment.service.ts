import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private url = 'http://localhost:3000/comments';

  constructor(private http: HttpClient) {}
  get_single_comment(id: string) {
    return this.http.get(`${this.url}/${id}`, { observe: 'response' });
  }
  get_comments_by_tailor_id(id: string) {
    return this.http.get(`${this.url}?tailor_id=${id}`, {
      observe: 'response',
    });
  }
  CreateCommenr(comment: any) {
    return this.http.post(this.url,comment, {observe: 'response'});
  }
}
