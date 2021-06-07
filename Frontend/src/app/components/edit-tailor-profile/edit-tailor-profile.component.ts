import { Component, OnInit } from '@angular/core';
import { TailorService } from 'src/app/services/tailor.service';

@Component({
  selector: 'app-edit-tailor-profile',
  templateUrl: './edit-tailor-profile.component.html',
  styleUrls: ['./edit-tailor-profile.component.css'],
})
export class EditTailorProfileComponent implements OnInit {
  constructor(private api: TailorService) {}

  ngOnInit(): void {}
  user: any = {
    name: 'kiki',
    about: '3la allah 7kaytk',
    avatar: '',
    gallary: ['', '', ''],
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
