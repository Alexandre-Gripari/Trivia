import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-navigate',
  templateUrl: './user-navigate.component.html',
  styleUrls: ['./user-navigate.component.scss']
})
export class UserNavigateComponent implements OnInit {

  private asc = true;

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

  addUser() {
    console.log("Add user");
  }

  filterList(filter: any) {
    const selectedValue = filter.target.value;
    switch (selectedValue) {
      case 'Date':
        //this.userService.sortByDate();
        break;
      case 'Priorité':
        //this.userService.sortByPriority();
        break;
      case 'Nom':
        this.userService.sortByName();
        break;
      case 'Birth':
        this.userService.sortByBirth();
        break;
    }
  }

  changeFilter(filter: any) {
    const selectedValue = filter.target.value;
    switch (selectedValue) {
      case 'Croissante':
        if (!this.asc) {
          this.userService.sortReverse();
          this.asc = true;
        }
        break;
      case 'Décroissante':
        if (this.asc) { 
          this.userService.sortReverse();
          this.asc = false
        }
        break;
    }
  }

}
