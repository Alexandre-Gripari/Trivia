import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-creator-container',
  templateUrl: './user-creator-container.component.html',
  styleUrls: ['./user-creator-container.component.scss']
})
export class UserCreatorContainerComponent implements OnInit {
  userForm: FormGroup = this.formBuilder.group({
    firstName: '',
    lastName: '',
    email: ''
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.userForm.value);
  }

  deleteUser() {
    console.log("User deleted");
  }
}