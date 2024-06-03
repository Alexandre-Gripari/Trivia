import { Injectable } from '@angular/core';
import { BehaviorSubject, first } from 'rxjs';
import { User } from '../models/user.model';
import { USER_LIST } from '../mocks/user-list.mock';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:9428';
  private currentUser: any;
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /**
   * The list of quiz.
   * The list is retrieved from the mock.
   */

  private users: User[] = USER_LIST;

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */

  public users$: BehaviorSubject<User[]> = new BehaviorSubject(USER_LIST);

  constructor(private http: HttpClient) {
  }

  sortByDate() {
    /*this.users.sort((a, b) => {
      return a.creationDate.getTime() - b.creationDate.getTime();
    });
    this.users$.next(this.users);*/
  }

  sortByName() {
    this.users.sort((a, b) => {
      return a.last_name.localeCompare(b.last_name);
    });
    this.users$.next(this.users);
  }

  sortByBirth() {
    this.users.sort((a, b) => {
      return Number(a.birth_date_year) - Number(b.birth_date_year);
    });
    this.users$.next(this.users);
  }

  sortReverse() {
    this.users.reverse();
    this.users$.next(this.users);
  }

  searchUser(searchValue: string) {
    let tmp : User[] = this.users.filter((user) => {
      return (user.first_name.toLowerCase() + ' ' + user.last_name.toLowerCase()).includes(searchValue.toLowerCase());
    });
    this.users$.next(tmp);
  }

  setCurrentUser(user: any) {
    this.currentUser = user;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

}
