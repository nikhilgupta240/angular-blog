import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  users;

  constructor(private request: UserService, private router: Router) {
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.request.getUsers()
      .subscribe(data => {
        this.users = data;
      });
  }

  loginUser(userName, password) {
    for (let i = 0; i < 4; i++) {
      let user = this.users[i];
      if (user.username == userName && user.password == password) {
        // store the user in session storage
        sessionStorage.user = user.id;
        this.router.navigate(['/home']);
        return;
      }
    }
    alert("Invalid username or password");
  }

}
