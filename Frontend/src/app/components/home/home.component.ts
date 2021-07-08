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
  tailors: any;

  filterForm = new FormGroup({
    'designFor=Male': new FormControl(''),
    'designFor=Female': new FormControl(''),
    'gender=Male': new FormControl(''),
    'gender=Female': new FormControl(''),
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
      this.sub = this.tailorInfo.get_tailors_info();
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

  // filterTailors(e: any) {
  //   if (e.target.checked) {
  //     let filter = e.target.value;
  //     const def = { designFor: 'All', gender: 'Male', rate: '5' };
  //     this.tailorInfo.get_tailors_info_filter(`designFor=${filter}`).subscribe(
  //       (res) => {
  //         this.tailors = res.body;
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  //   }
  // }

  // filteredTailors: string[] = new Array();
  // tempFilter: any;
  // selectedItems: string[] = new Array();

  // if (e.target.checked) {
  //   this.tempFilter = this.tailors.filter(
  //     (tailor: any) => tailor.designFor === e.target.value
  //   );
  //   this.filteredTailors.push(...this.tempFilter);
  //   this.selectedItems.push(e.target.id);
  // } else {
  //   this.selectedItems = this.selectedItems.filter(
  //     (elm) => elm != e.target.id
  //   );

  //   this.filteredTailors = this.filteredTailors.filter(
  //     (elm: any) => elm.designFor != e.target.value
  //   );
  // }
}
