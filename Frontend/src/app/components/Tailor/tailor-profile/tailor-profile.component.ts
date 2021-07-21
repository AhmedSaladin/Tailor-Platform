import { OnDestroy, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BindingService } from 'src/app/services/binding/binding.service';
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
    private rotuter: Router,
    private binding: BindingService
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
        this.binding.changeLoading(false);
        this.rotuter.navigate(['notfound']);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.eve != undefined) this.eve.unsubscribe();
  }
}
