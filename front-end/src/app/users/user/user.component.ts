import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { User } from '../../../models/user.model';
import { Router } from '@angular/router';
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  /**
   * Input here could be undefined, if the parent component doesn't give any quiz.
   * If you remove `undefined`, you will have an error saying:
   * "Property 'quiz' has no initializer and is not definitely assigned in the constructor."
   * We can also defined the initial value of the quiz in the constructor.
   */
  @Input()
  user: User | undefined;

  @Output()
  userSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.userService.setCurrentUser(this.user);
    console.log("user de setUser : " + this.user);
  }

  selectUser() {
    console.log("User selected");
    this.userSelected.emit(true);
  }

  navigateToQuizList() {
    this.router.navigate(['/quiz', this.user?.id]);
  }

  navigateToStats(){
    this.router.navigate(['/stats', this.user?.id]);
  }

  modifieUser(){
    const user: User | undefined = this.user;
    this.router.navigate(['/users/edit', this.user?.id], { state: { user } });
  }
}
