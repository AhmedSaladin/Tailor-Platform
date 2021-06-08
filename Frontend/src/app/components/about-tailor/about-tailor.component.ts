import { Component, OnInit } from '@angular/core';
import { TailorService } from 'src/app/services/tailor.service';

@Component({
  selector: 'app-about-tailor',
  templateUrl: './about-tailor.component.html',
  styleUrls: ['./about-tailor.component.css']
})
export class AboutTailorComponent implements OnInit {

  constructor(private tailorInfo: TailorService) { }
  tailors: any;
  ngOnInit(): void {
    this.tailorInfo.get_tailors_info().subscribe(
      (res) => {
        this.tailors = res.body;
      },
      (err) => {
        console.log(err);
      }
    )
  }

}
