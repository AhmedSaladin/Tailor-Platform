import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  emailtest:any;
  user:any;
  LoginForm: any;
  correctPass=true;

  constructor(private authServ:AuthService,private MyActiveed:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.LoginForm=new FormGroup({
      email:new FormControl('',[
        Validators.required,
        Validators.email,
        //Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')
      ]),
      password:new FormControl('',[
        Validators.required,
       // Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#\$&*~]).{8,}$')
      ])
    })
  }

  get email() {
    return this.LoginForm.get('email');
  }
  get password() {
    return this.LoginForm.get('password');
  }

  onSubmit(){
    if(this.LoginForm.valid){
      console.log(this.email?.value)
      this.authServ.loginByEmail(this.email?.value).subscribe(
        (res)=>{
          if(res.status==200){
            // console.log(res)
            //console.log(res.body)
            this.user=res;
            if(this.user.body.length!=0){
              //console.log(this.uesr.body[0].password)
              if(this.user.body[0].password==this.password?.value){
                this.correctPass=true;
                console.log(this.correctPass);
                this.router.navigateByUrl('/');
              }else{
                this.correctPass=false;
              }
            }else{
              this.correctPass=false;
              console.log("not fond")
            }
          }else{
            console.log("serverError")
          }
        },
        err=>console.log(err)
      )
    }
    // if(this.correctPass){
    //   this.router.navigateByUrl('/landing');
    // }
    //console.log("jj")
  }


}
