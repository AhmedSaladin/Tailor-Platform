import { Component, OnInit } from '@angular/core';
import { TailorService } from 'src/app/services/tailor.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private tailorInfo: TailorService) {}
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
