import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-tailor',
  templateUrl: './about-tailor.component.html',
  styleUrls: ['./about-tailor.component.css'],
})
export class AboutTailorComponent implements OnInit {
  constructor(private router: Router) {}
  goToTailorProfile(id: any) {
    this.router.navigateByUrl(`/tailor/${id}`);
  }
  ngOnInit(): void {}
  @Input() tailor: any;
}
