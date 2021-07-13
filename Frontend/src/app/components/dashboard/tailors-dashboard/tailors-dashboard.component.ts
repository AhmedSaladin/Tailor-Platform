import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { TailorService } from 'src/app/services/tailor.service';

@Component({
  selector: 'app-tailors-dashboard',
  templateUrl: './tailors-dashboard.component.html',
  styleUrls: ['./tailors-dashboard.component.css']
})
export class TailorsDashboardComponant implements OnInit {
  tailor: any;
  tailors: any;
  isTailor = true;
  id: any;
  formValidation: any;
  
  constructor(private tailorServive: TailorService , private formBuilder: FormBuilder) {
    // this.id.params.id;
  }

  ngOnInit(): void {
    this.tailorServive.getTailorsInfo().subscribe(
      (res) => { this.tailors = res },
      (err) => { console.log(err) }
    )

    this.formValidation = this.formBuilder.group({
      fname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[A-Z-a-z0-9_-]{3,10}$'),
        ],
      ],
      lname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[A-Z-a-z0-9_-]{3,10}$'),
        ],
      ],
      phone:[
        '',
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.minLength(11),
          Validators.pattern('^(([0-9]*)|(([0-9]*)\.([0-9]*)))$'),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$'
          ),
        ],
      ],
    });
  }

  get getControl() {
    return this.formValidation.controls;
  }


  AddTailor(form: NgForm) {
    let tailor = {
      name: form.value.fname + ' ' + form.value.lname,
      phone: form.value.phone,
      email: form.value.email,
      password: form.value.password,
      IsTailor: true,
    };
    this.tailorServive.AddNewTailor(tailor).subscribe();
    form.reset();
  }
  // filterArray(isTailor:boolean){
  //   this.filteredUsers =  this.users.filter(user => user === isTailor);
  // }
  getTailor(id: any) {
    console.log(id)
    return this.tailorServive.get_tailor_info(id).subscribe(
      (res => this.tailor = res.body),
      (err => console.log(err))
    );
  }

  deleteTailor(id: any) {
    return this.tailorServive.deleteTailor(id).subscribe(
      (res => console.log(res)),
      (err => console.log(err))
    )
  }
}

