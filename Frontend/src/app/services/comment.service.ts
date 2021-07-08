import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private url = 'http://localhost:3000/comments';

  constructor(private http: HttpClient) {}
  get_singel_comment(id: string) {
    return this.http.get(`${this.url}/${id}`, { observe: 'response' });
  }
}
