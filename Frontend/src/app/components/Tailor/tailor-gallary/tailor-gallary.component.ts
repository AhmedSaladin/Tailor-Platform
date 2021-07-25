import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UcWidgetComponent } from 'ngx-uploadcare-widget';
import { Subscription } from 'rxjs';
import { BindingService } from 'src/app/services/binding/binding.service';
import { TailorService } from 'src/app/services/tailor.service';
// add delete to uploaded images from UI and DB
@Component({
  selector: 'app-tailor-gallary',
  templateUrl: './tailor-gallary.component.html',
  styleUrls: ['./tailor-gallary.component.css'],
})
export class TailorGallaryComponent implements OnInit, OnDestroy {
  @Input() user_info: any;
  @Input() gallery: any;
  @Input() currentUserId: any;
  @ViewChild('upload_component')
  upload_component!: UcWidgetComponent;
  eve!: Subscription;
  constructor(
    private api: TailorService,
    private tostr: ToastrService,
    private binding: BindingService
  ) {}

  ngOnInit(): void {}
  on_upload_complete(event: any) {
    let url = event.cdnUrl;
    let length = event.count;
    for (let i = 0; i < length; i++) {
      this.gallery.push(`${url}nth/${i}/`);
    }
    this.user_info.gallary = this.gallery;
    const { gallary } = this.user_info;
    this.eve = this.api
      .update_tailor_info(this.user_info._id, { gallary })
      .subscribe();
    this.upload_component.clearUploads();
  }

  DeleteFromGallery(imgURL: string) {
    this.api.deleteSingleImg(imgURL, this.currentUserId).subscribe(
      () => {
        this.tostr.success('Image deleted successfuly', 'Success', {
          positionClass: 'toast-top-center',
        });
        this.gallery = this.gallery.filter((img: string) => img !== imgURL);
      },
      (err) => {
        this.binding.changeLoading(false);
        this.tostr.error(err, 'Error', { positionClass: 'toast-top-center' });
      }
    );
  }
  ngOnDestroy(): void {
    if (this.eve != undefined) this.eve.unsubscribe();
  }
}
