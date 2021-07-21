import { OnDestroy, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  @Output() user: any;
  tailor: any;
  tailorId = this.url.snapshot.params.id;
  constructor(
    private api: TailorService,
    private url: ActivatedRoute,
    private customer: CustomerService,
    private tostr: ToastrService,
    private rotuter: Router
  ) {
    this.currentUserId = this.customer.user.value?.Id;
    this.tailor = this.customer.user.value?.IsTailor;
    this.information(this.tailorId);
  }

  ngOnInit(): void {}

  information(id: string) {
    this.eve = this.api.get_tailor_info(id).subscribe(
      (res) => {
        this.user = res.body;
      },
      (err) => {
        this.tostr.error(err);
        this.rotuter.navigate(['notfound']);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.eve != undefined) this.eve.unsubscribe();
  }
}
