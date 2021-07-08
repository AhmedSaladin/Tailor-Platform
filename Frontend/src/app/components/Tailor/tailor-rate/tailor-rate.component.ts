import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-tailor-rate',
  templateUrl: './tailor-rate.component.html',
  styleUrls: ['./tailor-rate.component.css'],
})
export class TailorRateComponent implements OnInit {
  @Input() comments: any;
  constructor(private api: CommentService) {}

  ngOnInit(): void {
    this.get_comments();
    console.log(this.comments);
  }
  get_comments() {
    let arr: [];
    this.comments.map((id: string) => {
      this.api.get_singel_comment(id).subscribe(
        (res) => {
          // arr.push(res.body);
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }
}
