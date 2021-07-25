import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tailor-comments',
  templateUrl: './tailor-comments.component.html',
  styleUrls: ['./tailor-comments.component.css'],
})
export class TailorCommentsComponent implements OnInit {
  @Input() comment: any;
  rate!: Array<number>;
  myStyle: any = {};
  constructor() {}
  // looking for better solutions to handle stars.
  ngOnInit(): void {
  //  this.rate = new Array(this.comment.rate).fill(0);
    this.comment.customer_name=this.comment.customer_id.name;
    this.displayRate(this.comment.rate);
    //console.log(this.comment)
  }

  displayRate(rate: any) {
    const starPercentage = (rate / 5) * 100;
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
    this.myStyle = { width: starPercentageRounded };
  }

}
