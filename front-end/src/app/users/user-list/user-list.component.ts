import { Component, OnInit, HostListener, ElementRef, ViewChild  } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  //@ViewChild('scrollContainer', { static: true }) private scrollContainer!: ElementRef;

  public userList: User[] = [];
  private allUsers: User[] = [];

  constructor(public userService: UserService) {
    /*this.userService.users$.subscribe((userList) => {
      this.allUsers = userList;
      this.userList = this.allUsers;
      //this.userList = this.allUsers.slice(0, 8);
    });*/
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.userList = data;
      },
      (error) => {
        console.error('Error fetching user list', error);
      }
    );
  }
  userSelected(selected: boolean) {
    console.log('event received from child:', selected);
  }

  /*ngAfterViewInit() {
    this.scrollContainer.nativeElement.addEventListener('scroll', () => {
      console.log('scrolling');
      let pos = this.scrollContainer.nativeElement.scrollTop + this.scrollContainer.nativeElement.offsetHeight;
      let max = this.scrollContainer.nativeElement.scrollHeight;

      if (Math.round(pos) === max) {
        this.loadMoreUsers();
      }
    });
  }

  loadMoreUsers() {
    console.log('load more users');
    let nextUsers = this.userList.slice(this.userList.length, this.userList.length + 8);
    this.userList = [...this.userList, ...nextUsers];
  }*/

    sortByName() {
      this.userList.sort((a, b) => {
        return a.last_name.localeCompare(b.last_name);
      });
    }
  
    sortByBirth() {
      this.userList.sort((a, b) => {
        return Number(a.birth_date.substring(6,10)) - Number(b.birth_date.substring(6,10));
      });
    }
  
    sortReverse() {
      this.userList.reverse();
    }
  
    searchUser(searchValue: string) {
      let tmp : User[] = this.userList.filter((user) => {
        return (user.first_name.toLowerCase() + ' ' + user.last_name.toLowerCase()).includes(searchValue.toLowerCase());
      });
    }

}
