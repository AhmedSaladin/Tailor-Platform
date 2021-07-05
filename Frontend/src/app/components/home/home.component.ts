import { Component, OnInit } from '@angular/core';
import { TailorService } from 'src/app/services/tailor.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  filteredTailors: string[] = new Array();
  tempFilter: any;
  constructor(private tailorInfo: TailorService) {}
  tailors: any;
  selectedItems: string[] = new Array();
  desginFor:any;
  gender:any;

  FilteredArr = [];
  
  filterForm = new FormGroup ({
    'designFor=Male': new FormControl(''),
    'designFor=Female': new FormControl(''),
    'gender=Male': new FormControl(''),
    'gender=Female': new FormControl(''),
  })


  submit(formValue: any) {
    const Filtered = Object.keys(formValue).filter(
      filter => formValue[filter],
      );
      console.log(Filtered)

    // TODO Looking for a better solution
    // const queryString = Object.entries(Filtered).map(([key, value]) => `designFor=${value}`).join("&")
    const queryString = Filtered.join("&");
    console.log(queryString);

    this.tailorInfo.get_tailors_info_filter(queryString).subscribe(
            (res) => {
              this.tailors = res.body;
            },
            (err) => {
              console.log(err);
            }
          );

  }

  ngOnInit(): void {



    this.tailorInfo.get_tailors_info().subscribe(
      (res) => {
        this.tailors = res.body;
      },
      (err) => {
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
