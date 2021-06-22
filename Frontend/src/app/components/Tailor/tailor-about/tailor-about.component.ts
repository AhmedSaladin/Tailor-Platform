import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TailorService } from 'src/app/services/tailor.service';

@Component({
  selector: 'app-tailor-about',
  templateUrl: './tailor-about.component.html',
  styleUrls: ['./tailor-about.component.css'],
})
export class TailorAboutComponent implements OnInit, OnDestroy {
  @Input() user_info: any;
  eve: any;
  constructor(private api: TailorService) {}

  ngOnInit(): void {}

  update_tailor_about_section(about: string) {
    this.user_info.about = about;
    this.eve = this.api
      .update_tailor_info(this.user_info.id, this.user_info)
      .subscribe();
  }
  ngOnDestroy(): void {
    if (this.eve != undefined) this.eve.unsubscribe();  }
}
