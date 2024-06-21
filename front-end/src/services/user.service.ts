import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, first, throwError} from 'rxjs';
import { User } from '../models/user.model';
import { USER_LIST } from '../mocks/user-list.mock';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { serverUrl } from 'src/configs/server.config';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = serverUrl + 'users';
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
      return Number(a.birth_date.substring(6,10)) - Number(b.birth_date.substring(6,10));
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

  createUser(user: User | FormData): Observable<User> {
    if (user instanceof FormData) {
      return this.http.post<User>(this.apiUrl, user); //users
    } else {
      return this.http.post<User>(this.apiUrl, user);
    }
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  updateUser(userId: number, userData: User): Observable<User> {
    const url = `${this.apiUrl}/${userId}`;
    if (userData.profilepicture === "") userData.profilepicture = undefined;
    return this.http.put<User>(url, userData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }

  deleteUser(userId: number): Observable<void> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleError)
    );
  }

}
