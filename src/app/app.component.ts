import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private router: Router) {
  }

  sessionStorage = sessionStorage;

  link = {
    home: ['/home'],
    favourite: ['/favourite'],
    login: ['/login'],
    myblog: ['/myblog']
  };

  logoutUser() {
    sessionStorage.user = null;
    this.sessionStorage = sessionStorage;
    alert("Logged out successfully");
    this.router.navigate(this.link.home);
  }

}
