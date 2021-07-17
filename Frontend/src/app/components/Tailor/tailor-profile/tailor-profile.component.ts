import { OnDestroy, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';
import { TailorService } from 'src/app/services/tailor.service';

@Component({
  selector: 'app-tailor-profile',
  templateUrl: './tailor-profile.component.html',
  styleUrls: ['./tailor-profile.component.css'],
})
export class TailorProfileComponent implements OnInit, OnDestroy {
  eve!: Subscription;
  @Output() currentUserId: any;
  tailor: any;
  tailorId = this.url.snapshot.params.id;
  constructor(
    private api: TailorService,
    private url: ActivatedRoute,
    private customer: CustomerService
  ) {
    this.currentUserId = this.customer.user.value?.Id;
    this.tailor = this.customer.user.value?.IsTailor;
    this.information(this.tailorId);
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
