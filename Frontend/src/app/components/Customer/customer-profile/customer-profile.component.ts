import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { BindingService } from 'src/app/services/binding/binding.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css'],
})
export class CustomerProfileComponent implements OnInit {
  @Output() cust: any;
  @Output() custImg: any;
  eve!: Subscription;
  currentUserId: any;
  constructor(
    private custSer: CustomerService,
    private activeRout: ActivatedRoute,
    private tostr: ToastrService,
    private binding: BindingService
  ) {
    this.currentUserId = this.custSer.user.value?.Id;
    this.getCustomerINfo(activeRout.snapshot.params.id);
  }

  ngOnInit(): void {}
  getCustomerINfo(id: any) {
    this.eve = this.custSer.get_customer_info_id(id).subscribe(
      (res) => {
        this.cust = res;
        this.custImg = this.cust.avatar;
      },
      (err) => {
        this.binding.changeLoading(false);
        this.tostr.error(err, 'Error', { positionClass: 'toast-top-center' });
      }
    );
  }

  ngOnDestroy(): void {
    if (this.eve != undefined) this.eve.unsubscribe();
  }
}
