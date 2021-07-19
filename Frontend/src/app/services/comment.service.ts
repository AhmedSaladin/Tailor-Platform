import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  //private BaseUrl = 'http://localhost:3000/api/comments';
  private url = 'http://localhost:3000/api/comments';

  constructor(private http: HttpClient) {}
  get_single_comment(id: string) {
    return this.http.get(`${this.url}/${id}`, { observe: 'response' });
  }

  get_comments_by_tailor_id(id: string) {
    return this.http.get(`${this.url}?tailor_id=${id}`, {
      observe: 'response',
    });
  }
  get_comments_by_order_id(id: string) {
    return this.http.get(`${this.url}?order_id=${id}`, {
      observe: 'response',
    });
  }
  CreateCommenr(comment: any) {
    return this.http.post(this.url,comment, {observe: 'response'});
  }
  getTailorRate(tailor_id:any){
    return this.http.get(`${this.url}/rate/${tailor_id}`,{observe: 'response'})
  }
}
