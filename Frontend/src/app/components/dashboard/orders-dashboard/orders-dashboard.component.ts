import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders-dashboard',
  templateUrl: './orders-dashboard.component.html',
  styleUrls: ['./orders-dashboard.component.css']
})
export class OrdersDashboardComponent implements OnInit {

  orders: any;
  cstOrder: any;

  imags: any;
  count: any = 0;
  current_image: any;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    console.log(this.cstOrder)
    this.orderService.getOrder().subscribe(
      (res => { this.orders = res }),
      (err => { console.log(err) })
    )
  }

  deleteOrder(id: any) {
    return this.orderService.deleteOrder(id).subscribe(
      (res => { console.log(res) }),
      (err => { console.log(err) })
    )
  }

  getInfo(id: any) {
    return this.orderService.getOrderById(id).subscribe(
      (res => {
        console.log(this.cstOrder)
        this.cstOrder = res.body
        console.log(this.cstOrder)

      }),
      (err => { console.log(err) })
    )
  }


  next_img() {
    if (this.imags.length - 1 > this.count) this.count++;
    else this.count = 0;
    this.current_image = this.imags[this.count];
  }

  last_img() {
    if (this.count == 0) this.count = this.imags.length - 1;
    else this.count--;
    this.current_image = this.imags[this.count];
  }

}
