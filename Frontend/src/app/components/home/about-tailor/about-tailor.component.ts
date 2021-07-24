import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-about-tailor',
  templateUrl: './about-tailor.component.html',
  styleUrls: ['./about-tailor.component.css'],
})
export class AboutTailorComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private apiComment: CommentService) {}
  goToTailorProfile(id: any) {
    this.router.navigateByUrl(`/tailor/${id}`);
  }
  ngOnInit(): void {
    this.get_tailor_rate();
  }
  @Input() tailor: any;
  eve!: Subscription;
  review: any;
  starsTotal = 5;
  myStyle: any = {};

  get_tailor_rate() {
    this.eve = this.apiComment
      .getTailorRate(this.tailor._id)
      .subscribe((res) => {
        this.review = res.body;
        if (this.review.length == 0) {
          this.review[0] = {
            count: 0,
            rate: 5,
          };
        }
        this.review = this.review[0];
        this.displayRate(this.review.rate);
      });
  }

  displayRate(rate: any) {
    const starPercentage = (rate / 5) * 100;
    // Round to nearest 10
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
    this.myStyle = { width: starPercentageRounded };
  }
  ngOnDestroy(): void {
    if (this.eve) this.eve.unsubscribe();
  }
}
