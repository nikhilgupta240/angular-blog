import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

const BASE_URL = 'http://localhost:3000/users/';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUsers() {
    return this.http.get(BASE_URL);
  }

  getUser(id) {
    return this.http.get(`${BASE_URL}${id}`);
  }

  updateUser(user) {
    return this.http.patch(`${BASE_URL}${user.id}`, user);
  }

}
