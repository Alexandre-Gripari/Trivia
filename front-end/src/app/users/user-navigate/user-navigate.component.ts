import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-navigate',
  templateUrl: './user-navigate.component.html',
  styleUrls: ['./user-navigate.component.scss']
})

export class UserNavigateComponent implements OnInit {

  private asc = true;
  searchValue: string = '';

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  addUser() {
    console.log("Add user");
    this.router.navigate(['/user-creator-page']);
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

  onSearchChange(value: string) {
    this.searchValue = value;
    this.userService.searchUser(value); 
  }

}
