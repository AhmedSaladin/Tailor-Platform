import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TailorService } from 'src/app/services/tailor.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  name: string = '';
  constructor(
    private tailorService: TailorService,
    private MyActived: ActivatedRoute,
    private router: Router
  ) {
    // this.name = MyActived.snapshot.params.user;
  }
  tailors: any;
  ngOnInit(): void {
    /*this.tailorService.get_tailor_info_by_name(this.name).subscribe(
      (res) => {
        this.tailors = res.body;
      },
      (err) => {
        console.log(err);
      }
    );*/
  }
}
