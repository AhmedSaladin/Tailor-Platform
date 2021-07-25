import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
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

  constructor(
    private tailorService: TailorService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  @Output() send = new EventEmitter();

  filter() {
    this.eve = this.tailorService.get_tailor_search(this.searchText).subscribe(
      (res) => {
        this.tailors = res.body;
        this.send.emit(this.tailors);
      },
      (err) => {
        this.toastr.error(err, 'Error', { positionClass: 'toast-top-center' });
      }
    );
  }
  ngOnDestroy(): void {
    if (this.eve != undefined) this.eve.unsubscribe();
  }
}
