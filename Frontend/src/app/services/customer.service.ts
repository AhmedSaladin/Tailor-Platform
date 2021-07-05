import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private MyCustomer:HttpClient) { }

  private BaseUrl = "http://localhost:3000/users";

  AddNewCustomer(customer:any){
    return this.MyCustomer.post(this.BaseUrl,customer)
  }

  getCustomerInfo(){
    return this.MyCustomer.get(this.BaseUrl);
  }

  getCustomerInfoByID(id:number){
    return this.MyCustomer.get(`${this.BaseUrl}/${id}`);
  }

  updateCustomerInfo(id:number,customer:any){
    return this.MyCustomer.put(`${this.BaseUrl}/${id}`,customer)
  }

  get_customer_info_id(id: any) {
    return this.MyCustomer.get(`${this.BaseUrl}/${id}`, { observe: 'response' });
  }

  update_customer_info(id: any, body: any) {
    return this.MyCustomer.put(`${this.BaseUrl}/${id}`, body, { observe: 'response' });
  }
}
