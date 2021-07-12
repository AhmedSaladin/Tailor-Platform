import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customer: any;
  users: any;
  isTailor = false;
  filteredUsers: any;
  id: any;
  //  i:any;
  //  index:any;
  constructor(private customerServive: CustomerService) {
    // this.id.params.id;
  }

  ngOnInit(): void {
    this.customerServive.getCustomerInfo().subscribe(
      (res) => { this.users = res },
      (err) => { console.log(err) }
    )
  }

  // filterArray(isTailor:boolean){
  //   this.filteredUsers =  this.users.filter(user => user === isTailor);
  // }
  getCustomer(id: any) {
    console.log(id)
    return this.customerServive.get_customer_info_id(id).subscribe(
      (res => this.customer = res.body),
      (err => console.log(err))
    );
  }

  deleteCustomer(id: any) {
    return this.customerServive.deleteCustomer(id).subscribe(
      (res => console.log(res)),
      (err => console.log(err))
    )
  }
}
