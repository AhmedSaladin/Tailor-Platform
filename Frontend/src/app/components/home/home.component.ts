import { Component, OnInit } from '@angular/core';
import { TailorService } from 'src/app/services/tailor.service';

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

  filterTailors(e: any) {
    if (e.target.checked) {
      let filter = e.target.value;
      this.tailorInfo.get_tailors_info_filter(`designFor=${filter}`).subscribe(
        (res) => {
          this.tailors = res.body;
        },
        (err) => {
          console.log(err);
        }
      );
    }

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

  isFiltered() {
    return !(this.selectedItems.length === 0);
  }
}
