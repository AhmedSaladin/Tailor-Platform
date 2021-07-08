import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TailorService } from 'src/app/services/tailor.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  url: string = 'http://localhost:3000/users';
  usersArray: Array<any> = [];
  searchText: any = '';
  tailors: any;

  constructor(private tailorService: TailorService) {}
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }

  @Output() send = new EventEmitter();

  sendSearch() {
    this.filter();
    this.send.emit(this.usersArray);
  }
  filter() {
    this.tailorService.get_tailors_info().subscribe(
      (res) => {
        this.tailors = res.body;
      },
      (err) => {
        console.log(err);
      }
    );
    if (this.searchText === '') {
      this.usersArray = this.tailors;
    } else {
      let x;
      let searchLower = this.searchText.toLocaleLowerCase();
      this.usersArray = this.tailors.filter((it: any) => {
        x = it.name.toLocaleLowerCase().includes(searchLower);
        return x;
      });
    }
  }
  ngOnInit(): void {
    this.filter();
  }
}
