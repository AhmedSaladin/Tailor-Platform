import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TailorService } from 'src/app/services/tailor.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  url: string = 'http://localhost:3000/users';
  usersArray: Array<any> = [];

  constructor(
    private tailorService: TailorService,
    private MyActived: ActivatedRoute
  ) {}

  ngOnInit(): void {}
}
