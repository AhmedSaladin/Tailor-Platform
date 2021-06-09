import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-about-tailor',
  templateUrl: './about-tailor.component.html',
  styleUrls: ['./about-tailor.component.css'],
})
export class AboutTailorComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
  @Input() tailor: any;
}
