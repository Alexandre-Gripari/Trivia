import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-navigate',
  templateUrl: './user-navigate.component.html',
  styleUrls: ['./user-navigate.component.scss']
})
export class UserNavigateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  addUser() {
    console.log("Add user");
  }

}
