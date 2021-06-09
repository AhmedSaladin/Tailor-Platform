import { Component, Input, OnInit } from '@angular/core';
import { TailorService } from 'src/app/services/tailor.service';

@Component({
  selector: 'app-tailor-about',
  templateUrl: './tailor-about.component.html',
  styleUrls: ['./tailor-about.component.css'],
})
export class TailorAboutComponent implements OnInit {
  @Input() user_info: any;
  constructor(private api: TailorService) {}

  ngOnInit(): void {}

  update_tailor_about_section(about: string) {
    this.user_info.about = about;
    this.api.update_tailor_info(this.user_info.id, this.user_info).subscribe();
  }
}
