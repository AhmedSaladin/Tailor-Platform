import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tailor-comments',
  templateUrl: './tailor-comments.component.html',
  styleUrls: ['./tailor-comments.component.css'],
})
export class TailorCommentsComponent implements OnInit {
  @Input() comment: any;
  rate!: Array<number>;
  constructor() {}
  // looking for better solutions to handle stars.
  ngOnInit(): void {
    this.rate = new Array(this.comment.rate).fill(0);
  }
}
