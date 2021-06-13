import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TailorService } from 'src/app/services/tailor.service';

@Component({
  selector: 'app-edit-tailor-profile',
  templateUrl: './edit-tailor-profile.component.html',
  styleUrls: ['./edit-tailor-profile.component.css'],
})
export class EditTailorProfileComponent implements OnInit {
  constructor(private api: TailorService) {}

  ngOnInit(): void {
    this.information();
  }
  @Output() user: any = {
    id: 2,
    name: 'kiki',
    designFor: 'male',
    about: '3la allah 7kaytk',
    avatar: 'assets/images/tailor1.jpg',
    gallary: [
      'assets/images/services1.jpeg',
      'assets/images/services2.jpeg',
      'assets/images/services3.jpeg',
    ],
  };
  information() {
    this.api.get_tailor_info(2).subscribe(
      (res) => {
        console.log(res);
        this.user = res.body;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
