import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TailorService } from 'src/app/services/tailor.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private tailorService: TailorService,
    private MyActived: ActivatedRoute,
    private router: Router
  ) {}
  tailors: any;
  ngOnInit(): void {
    this.tailorService.get_tailor_info_by_name('').subscribe(
      (res) => {
        this.tailors = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
