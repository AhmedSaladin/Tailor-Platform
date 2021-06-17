import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TailorService } from 'src/app/services/tailor.service';

@Component({
  selector: 'app-tailor-gallary',
  templateUrl: './tailor-gallary.component.html',
  styleUrls: ['./tailor-gallary.component.css'],
})
export class TailorGallaryComponent implements OnInit, OnDestroy {
  @Input() user_info: any;
  @Input() gallery: any;
  images: any;
  eve: any;
  constructor(private api: TailorService) {}

  ngOnInit(): void {
    console.log(this.gallery);
  }
  on_upload_complete(event: any) {
    let url = event.cdnUrl;
    let length = event.count;
    for (let i = 0; i < length; i++) {
      this.gallery.push(`${url}nth/${i}/`);
    }
    this.user_info.gallary = this.gallery;
    this.eve = this.api
      .update_tailor_info(this.user_info.id, this.user_info)
      .subscribe();
  }
  ngOnDestroy(): void {
    this.eve.unsubscribe();
  }
}
