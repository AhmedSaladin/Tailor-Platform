import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit, OnDestroy {
  constructor(private api: CustomerService) {}
  user: any;
  eve: any;
  ngOnInit(): void {
    // ID is hard coded it change when auth work.
    this.eve = this.api.get_customer_info_id(1).subscribe(
      (res) => {
        this.user = res.body;
        console.log(this.user);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnDestroy() {
    this.eve.unsubscribe();
  }
}
