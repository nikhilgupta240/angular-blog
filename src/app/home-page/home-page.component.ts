import {Component, OnInit} from '@angular/core';
import {BlogService} from "../blog.service";
import {UserService} from "../user.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  blogs: Object[];
  users: Object;
  currentUser;

  constructor(private request: BlogService, private userRequest: UserService) {

  }

  ngOnInit() {
    this.getUsers();
    this.getBlogs();
  }

  getBlogs() {
    this.request.loadBlogs()
      .subscribe((data) => {
        this.blogs = data;
      });
  }

  getUsers() {
    this.userRequest.getUsers()
      .subscribe(data => {
        this.users = data;
        this.currentUser = this.users[sessionStorage.user - 1];
      });
  }

}
