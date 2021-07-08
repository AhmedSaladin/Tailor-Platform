import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

interface Order {
  customerID: string;
  tailorID: string;
  status: string;
  design: [];
  customer_sizes: {
    chest: number;
    armLength: number;
    waist: number;
    hight: number;
    inseam: number;
    shoulder: number;
  };
}
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit, OnDestroy {
  user: any;
  eve: any;
  order!: Order;
  constructor(private api: CustomerService, private url: ActivatedRoute) {
    this.get_customer_data();
    // Create user id and get it form local storge when auth done.
  }
  ngOnInit(): void {}
  get_customer_data() {
    // ID is hard coded it change when auth work.
    this.eve = this.api.get_customer_info_id(1).subscribe(
      (res) => {
        this.user = res.body;
        this.create_order(res.body);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  create_order(user: any) {
    this.order = {
      customerID: `${this.user.id}`,
      tailorID: this.url.snapshot.params.id,
      status: 'pending',
      design: [],
      customer_sizes: {
        chest: user.chest,
        armLength: user.armLength,
        waist: user.waist,
        hight: user.hight,
        inseam: user.inseam,
        shoulder: user.shoulder,
      },
    };
  }
  submitD() {
    console.log(this.order);
  }
  ngOnDestroy() {
    this.eve.unsubscribe();
  }
}
