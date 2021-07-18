import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  constructor(private router: Router) {}
  designFor: any = 'Choose a Specialization..';
  men: any = 'Men';
  women: any = 'Women';
  all: any = 'all';

  ngOnInit(): void {}
  sendSearchToHome() {
    if (this.designFor == 'Choose a Specialization..' || this.designFor == 'all')
      this.router.navigateByUrl('/home');
    else this.router.navigateByUrl('/home?designFor=' + this.designFor);
  }
}
