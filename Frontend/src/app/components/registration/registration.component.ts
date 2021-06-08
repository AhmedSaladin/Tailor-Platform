import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  
  constructor(private myCustomer:CustomerService) { }
  
  ngOnInit(): void {
  }
    
   AddCustomer(fname:any,lname:any,email:any,password:any){
    let isTailor =false;
     let customer ={fname:fname,lname:lname,email:email,password:password,IsTailor:false}
      this.myCustomer.AddNewCustomer(customer).subscribe();
  }
}
