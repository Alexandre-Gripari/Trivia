import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-edit-container',
  templateUrl: './user-edit-container.component.html',
  styleUrls: ['./user-edit-container.component.scss']
})

export class UserEditContainerComponent implements OnInit {
  @Input() user: User | any;
  userForm: FormGroup = this.formBuilder.group({
    first_name: '',
    last_name: '',
    birth_date: '',
    alzheimerStage: '',
    profilepicture: '',
  });

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      first_name: [this.user ? this.user.first_name : ''],
      last_name: [this.user ? this.user.last_name : ''],
      birth_date: [this.user ? this.user.birth_date : ''],
      alzheimerStage: [this.user ? this.user.alzheimerStage : ''],
      profilepicture: [this.user ? this.user.profilepicture : ''],
    });
    this.userService.getUsers().subscribe((data: any) => {
      this.user = data;
    });
  }

  ngAfterViewInit() {
    const navigation = window.history.state;
    if (navigation && navigation.user) {
      this.user = navigation.user;
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.user.profilepicture = input.files[0];
      console.log(this.user.profilepicture);
    }
  }

  onSubmit() {
    const user: User = this.userForm.value;
    if (this.user) {
      if (this.user.profilepicture) {
        console.log('File selected:', this.user.profilepicture);
      }
      this.userService.updateUser(this.user.id, user).subscribe(
        response => {
          console.log('User updated', response);
          this.router.navigate(['/user-page']);
        },
        error => {
          console.error('Error updating user', error);
        }
      );
    } else {
      this.userService.createUser(user).subscribe(
        response => {
          console.log('User created', response);
        },
        error => {
          console.error('Error creating user', error);
        }
      );
    }
  }


  deleteUser() {
    if (this.user.id) {
      this.userService.deleteUser(this.user.id)
        .subscribe(
          () => {
            console.log('User deleted successfully');
          },
          error => {
            console.error('Error deleting user', error);
          }
        );
      this.router.navigate(['/user-page']);
    }
  }
}
