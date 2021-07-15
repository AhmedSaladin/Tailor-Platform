import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-edit-customer-profile',
  templateUrl: './edit-customer-profile.component.html',
  styleUrls: ['./edit-customer-profile.component.css'],
})
export class EditCustomerProfileComponent implements OnInit {
  @Output() cust: any;
  @Output() custImg: any;
  eve!: Subscription;
  currentUserId: any;
  constructor(
    private custSer: CustomerService,
    private activeRout: ActivatedRoute
  ) {
    this.currentUserId = this.custSer.user.value?.Id;
    this.getCustomerINfo(activeRout.snapshot.params.id);
  }

  ngOnInit(): void {}
  getCustomerINfo(id: any) {
    this.eve = this.custSer.get_customer_info_id(id).subscribe(
      (res) => {
        this.cust = res.body;
        this.custImg = this.cust.avatar;
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
