import { Component, OnInit } from '@angular/core';
import { BindingService } from 'src/app/services/binding/binding.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  isLoading: Boolean = true;

  constructor(private binding: BindingService) { }

  ngOnInit(): void {
    this.binding.isLoading.subscribe(res => this.isLoading = res);
  }

}
