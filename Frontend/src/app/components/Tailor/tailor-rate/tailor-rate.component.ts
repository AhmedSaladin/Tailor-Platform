import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-tailor-rate',
  templateUrl: './tailor-rate.component.html',
  styleUrls: ['./tailor-rate.component.css'],
})
export class TailorRateComponent implements OnInit, OnDestroy {
  @Input() comments: any;
  eve: any;
  constructor(private api: CommentService, private url: ActivatedRoute) {
    let id = url.snapshot.params.id;
    this.get_tailor_comments(id);
  }

  ngOnInit(): void {}

  get_tailor_comments(id: string) {
    this.eve = this.api.get_comments_by_tailor_id(id).subscribe(
      (res) => {
        this.comments = res.body;
        console.log(this.comments);
      },
      (err) => console.log(err)
    );
  }
  ngOnDestroy(): void {
    this.eve.subscribe();
  }
}
