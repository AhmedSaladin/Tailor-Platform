import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TailorService } from 'src/app/services/tailor.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderComponent } from './header/header.component';
import { Tailor } from '../shared/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private tailorInfo: TailorService,
    private route: ActivatedRoute
  ) {}
  queryParamsFilter: any = this.route.snapshot.queryParams;
  tailors!: Array<Tailor>;
  page: number = 1;
  totalPages: number = 1;
  limit: number = 3;
  sub: any;
  eve!: Subscription;
  dataFiltered = false;
  search = false;
  sendPage = new EventEmitter();
  // ==========search from header ========================
  sendSearch(obj: any) {
    this.search = true;
    this.tailors = obj.tailors;
    this.totalPages = obj.totalPages;
  }

  // ============================================

  filterForm = new FormGroup({
    'designFor=Men': new FormControl(''),
    'designFor=Women': new FormControl(''),
    'gender=male': new FormControl(''),
    'gender=female': new FormControl(''),
    'rate=1': new FormControl(''),
    'rate=2': new FormControl(''),
    'rate=3': new FormControl(''),
    'rate=4': new FormControl(''),
    'rate=5': new FormControl(''),
  });
  // filtering based on sidebar selection
  filterTailors(formValue: any) {
    this.dataFiltered = true;
    this.search = false;

    const Filtered = Object.keys(formValue).filter(
      (filter) => formValue[filter]
    );
    const queryString = Filtered.join('&');
    this.tailorInfo
      .get_tailors_info_filter(this.limit, this.page, queryString)
      .subscribe(
        (res) => {
          this.totalPages = res.totalPages;
          if (res == null) this.tailors = [];
          else this.tailors = res.tailors;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  get_tailors() {
    if (Object.entries(this.queryParamsFilter).length !== 0) {
      // show tailors based on landing page filtering
      const queryString = Object.entries(this.queryParamsFilter)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
      this.sub = this.tailorInfo.get_tailors_info_filter(
        this.limit,
        this.page,
        queryString
      );
    } else {
      // get all tailors
      this.sub = this.tailorInfo.get_tailors_info(this.limit, this.page);
    }
    this.eve = this.sub.subscribe(
      (res: any) => {
        this.totalPages = res.totalPages;
        if (res == null) this.tailors = [];
        else this.tailors = res.tailors;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    this.get_tailors();
  }
  @ViewChild(HeaderComponent) header!: HeaderComponent;

  nextPage() {
    if (this.page === this.totalPages) return;
    this.page++;
    if (this.dataFiltered) this.filterTailors(this.filterForm.value);
    else if (this.search) this.header.new_page(this.page);
    else this.get_tailors();
  }
  previousPage() {
    if (this.page === 1) return;
    this.page--;
    if (this.dataFiltered) this.filterTailors(this.filterForm.value);
    else if (this.search) this.header.new_page(this.page);
    else this.get_tailors();
  }

  ngOnDestroy(): void {
    if (this.eve != undefined) this.eve.unsubscribe();
  }
}
