import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TailorService } from 'src/app/services/tailor.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  url: string = 'http://localhost:3000/users';
  usersArray: Array<any> = [];

  constructor(
    private tailorService: TailorService,
    private MyActived: ActivatedRoute,
    // private http: Http,
    private router: Router
  ) {
    // this.http.get(this.url).subscribe((data: any) => {
    //   data.json().forEach((element: any) => {
    //     this.usersArray.push(element.name);
    //   });
    // });
    // this.name = MyActived.snapshot.params.user;
  }
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
