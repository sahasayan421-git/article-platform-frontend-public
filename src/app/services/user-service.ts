import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  searchUsers(query: string): Observable<User[]> {

    return this.http.get<User[]>(
      `/api/users/search?query=${query}`
    );
  }

  // searchUsers(query: string) {

  //   return this.http.get<any[]>(
  //     `/api/users/search?query=${query}`
  //   );
  // }
}