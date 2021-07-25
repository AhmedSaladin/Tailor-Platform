import { Component, OnInit } from '@angular/core';
import { TailorService } from 'src/app/services/tailor.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private tailorInfo: TailorService,
    private route: ActivatedRoute
  ) {}
  queryParamsFilter: any = this.route.snapshot.queryParams;
  tailors: any = [];

  // ==========search from header ========================
  FilterArr = [];
  arrTailorFromHeader = [];
  sendSearch(tailorSearchResult: any) {
    this.tailors = tailorSearchResult;
  }

  // ============================================

  filterForm = new FormGroup({
    'designFor=Men': new FormControl(''),
    'designFor=Women': new FormControl(''),
    'gender=male': new FormControl(''),
    'gender=female': new FormControl(''),
  });
  // filtering based on sidebar selection
  filterTailors(formValue: any) {
    const Filtered = Object.keys(formValue).filter(
      (filter) => formValue[filter]
    );
    const queryString = Filtered.join('&');
    this.tailorInfo.get_tailors_info_filter(queryString).subscribe(
      (res) => {
        this.tailors = res.body;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  sub: any;
  ngOnInit(): void {
    // show tailors based on landing page filtering
    if (this.queryParamsFilter) {
      const queryString = Object.entries(this.queryParamsFilter)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
      this.sub = this.tailorInfo.get_tailors_info_filter(queryString);
    } else {
      // get all tailors
      // check out later
      this.sub = this.tailorInfo.get_tailors_info(5, 1);
    }
    this.sub.subscribe(
      (res: any) => {
        this.tailors = res.body;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
