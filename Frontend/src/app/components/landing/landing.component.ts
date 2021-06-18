import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private router:Router,private MyActiveed:ActivatedRoute) { }
  designFor:any="Choose...";
  male:any="male";
  female:any="female";
  all:any="all";

  ngOnInit(): void {

  }
  sendSearchToHome(){
    console.log(this.designFor)
    if(this.designFor=="Choose...")
      this.designFor="all";
    this.router.navigateByUrl('/home?designFor='+this.designFor);
  }
}
