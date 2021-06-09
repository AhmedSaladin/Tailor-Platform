import { Component, Input, OnInit } from '@angular/core';
import { TailorService } from 'src/app/services/tailor.service';

@Component({
  selector: 'app-tailor-information',
  templateUrl: './tailor-information.component.html',
  styleUrls: ['./tailor-information.component.css'],
})
export class TailorInformationComponent implements OnInit {
  @Input() user_info: any;

  constructor(private api: TailorService) {}

  update_tailor_name(name: string) {
    this.user_info.name = name;
    this.api.update_tailor_info(this.user_info.id, this.user_info).subscribe();
  }
  ngOnInit(): void {}
}
