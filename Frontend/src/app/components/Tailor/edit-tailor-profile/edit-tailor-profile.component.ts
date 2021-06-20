import { OnDestroy, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TailorService } from 'src/app/services/tailor.service';

@Component({
  selector: 'app-edit-tailor-profile',
  templateUrl: './edit-tailor-profile.component.html',
  styleUrls: ['./edit-tailor-profile.component.css'],
})
export class EditTailorProfileComponent implements OnInit, OnDestroy {
  eve: any;
  constructor(private api: TailorService, private id: ActivatedRoute) {
    this.information(id.snapshot.params.id);
  }

  ngOnInit(): void {}
  @Output() user: any;

  information(id: string) {
    this.eve = this.api.get_tailor_info(id).subscribe(
      (res) => {
        this.user = res.body;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.eve != undefined) this.eve.unsubscribe();
  }
}
