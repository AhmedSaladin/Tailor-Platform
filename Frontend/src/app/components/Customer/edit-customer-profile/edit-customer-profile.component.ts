import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-edit-customer-profile',
  templateUrl: './edit-customer-profile.component.html',
  styleUrls: ['./edit-customer-profile.component.css']
})
export class EditCustomerProfileComponent implements OnInit {
  @Output() cust:any;
  @Output() custId:any;
  @Output() custImg:any;
  eve: any;
  constructor(private custSer: CustomerService, private activeRout: ActivatedRoute) {
    this.getCustomerINfo(activeRout.snapshot.params.id);
  }

  ngOnInit(): void {
  }
  getCustomerINfo(id: any) {
    this.eve =this.custSer.get_customer_info_id(id).subscribe(
      (res) => {
        this.cust = res.body;
        this.custImg=this.cust.avatar;
        this.custId=this.cust.id;
        console.log(this.cust)
        console.log(this.custId)
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
