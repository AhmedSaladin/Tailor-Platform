import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-tailor-rate',
  templateUrl: './tailor-rate.component.html',
  styleUrls: ['./tailor-rate.component.css'],
})
export class TailorRateComponent implements OnInit, OnDestroy {
  comments: any;
  eve!: Subscription;
  constructor(private api: CommentService, private url: ActivatedRoute) {
    let id = url.snapshot.params.id;
    this.get_tailor_comments(id);
    this.comments = [];
  }

  ngOnInit(): void {}

  get_tailor_comments(id: string) {
    this.eve = this.api.get_comments_by_tailor_id(id).subscribe(
      (res) => {
        this.comments = res.body;
      },
      (err) => console.log(err)
    );
  }
  ngOnDestroy(): void {
    this.eve.unsubscribe();
  }
}
