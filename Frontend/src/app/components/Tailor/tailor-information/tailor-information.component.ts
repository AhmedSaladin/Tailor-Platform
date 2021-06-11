import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TailorService } from 'src/app/services/tailor.service';

@Component({
  selector: 'app-tailor-information',
  templateUrl: './tailor-information.component.html',
  styleUrls: ['./tailor-information.component.css'],
})
export class TailorInformationComponent implements OnInit, OnDestroy {
  @Input() user_info: any;
  eve: any;
  constructor(private api: TailorService) {}
  update_tailor_name(user: NgForm) {
    this.user_info.name = user.value.name;
    this.user_info.designFor = user.value.design;
    this.eve = this.api
      .update_tailor_info(this.user_info.id, this.user_info)
      .subscribe();
  }
  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.eve.unsubscribe();
  }
}
