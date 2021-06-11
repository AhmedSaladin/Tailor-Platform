import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tailor-gallary',
  templateUrl: './tailor-gallary.component.html',
  styleUrls: ['./tailor-gallary.component.css'],
})
export class TailorGallaryComponent implements OnInit {
  @Input() user_info: any;
  constructor() {}

  ngOnInit(): void {}
}
