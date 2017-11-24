import {Component, OnInit} from '@angular/core';
import {BlogService} from "../blog.service";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-blog',
  templateUrl: './my-blog.component.html',
  styleUrls: ['./my-blog.component.css']
})
export class MyBlogComponent implements OnInit {

  blogs: Object[];
  users;
  currentUser;

  constructor(private request: BlogService, private userRequest: UserService, private router: Router) {
  }

  ngOnInit() {
    this.getUsers();
    this.getUserBlog();
  }

  getUserBlog() {
    this.request.loadUserBlogs(sessionStorage.user)
      .subscribe(data => {
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

  editBlog(blog) {
    this.router.navigate(['/addblog', {id: blog.id}]);
  }

  deleteBlog(blog) {
    this.request.deleteBlog(blog.id)
      .subscribe(data => {
        this.getUserBlog();
      });
  }

}
