import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TailorService } from 'src/app/services/tailor.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  searchText: any = '';
  tailors: any;
  eve!: Subscription;
  totalPages: number = 1;
  page: number = 1;
  limit: number = 3;
  @Output() send = new EventEmitter();

  constructor(
    private tailorService: TailorService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  filter() {
    this.eve = this.tailorService
      .get_tailor_search(this.limit, this.page, this.searchText)
      .subscribe(
        (res) => {
          this.totalPages = res.totalPages;
          if (res == null) this.tailors = [];
          else this.tailors = res.tailors;
          this.send.emit({
            tailors: this.tailors,
            totalPages: this.totalPages,
          });
        },
        (err) => {
          this.toastr.error(err, 'Error', {
            positionClass: 'toast-top-center',
          });
        }
      );
  }

  new_page(page: number) {
    this.page = page;
    this.filter();
  }
  ngOnDestroy(): void {
    if (this.eve != undefined) this.eve.unsubscribe();
  }
}
