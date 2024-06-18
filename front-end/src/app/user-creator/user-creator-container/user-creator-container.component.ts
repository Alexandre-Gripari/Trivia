import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-creator-container',
  templateUrl: './user-creator-container.component.html',
  styleUrls: ['./user-creator-container.component.scss']
})

export class UserCreatorContainerComponent implements OnInit {
  @Input() user: User | any;
  userForm: FormGroup;
  filePreview: string | ArrayBuffer | null | undefined = undefined;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.userForm = this.formBuilder.group({
      first_name: '',
      last_name: '',
      birth_date: '',
      alzheimerStage: '',
      profilepicture: '',
    });
  }


  ngOnInit() {
    this.userForm = this.formBuilder.group({
      first_name: [this.user ? this.user.first_name : ''],
      last_name: [this.user ? this.user.last_name : ''],
      birth_date: [this.user ? this.user.birth_date : ''],
      alzheimerStage: [this.user ? this.user.alzheimerStage : ''],
      profilepicture: [''],
    });
  }

  onSubmit() {
    const user: any = this.userForm.value;

    if (this.userForm.get('profilepicture')?.value instanceof File) {
      const formData = new FormData();
      formData.append('first_name', user.first_name);
      formData.append('last_name', user.last_name);
      formData.append('birth_date', user.birth_date);
      formData.append('alzheimerStage', user.alzheimerStage);
      formData.append('profilepicture', this.userForm.get('profilepicture')?.value);

      this.userService.createUser(formData).subscribe(
        response => {
          console.log('User created', response);
          this.router.navigate(['/user-page']);
        },
        error => {
          console.error('Error creating user', error);
        }
      );
    } else {
      user.profilepicture = 'C:\\\\fakepath\\\\7 dims.png';

      this.userService.createUser(user).subscribe(
        response => {
          console.log('User created', response);
          this.router.navigate(['/user-page']);
        },
        error => {
          console.error('Error creating user', error);
        }
      );
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.user.profilepicture = file;

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.filePreview = e.target?.result;
        this.userForm.patchValue({ profilepicture: this.filePreview });
      };
      reader.readAsDataURL(file);
    }
  }
}

