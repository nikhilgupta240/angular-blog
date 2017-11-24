import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../user.service";
import {BlogService} from "../blog.service";

@Component({
  selector: 'app-favourite-page',
  templateUrl: './favourite-page.component.html',
  styleUrls: ['./favourite-page.component.css']
})
export class FavouritePageComponent implements OnInit {

  author_id;
  favourite_ids: number[];
  author: any;
  favourites: any[] = [];
  users;

  constructor(private router: Router, private request: UserService, private blogRequest: BlogService) {
  }

  ngOnInit() {
    if (sessionStorage.user == 'null') {
      this.router.navigate(['/home']);
    }
    this.author_id = sessionStorage.user;
    this.getUsers();
  }

  getFavourites() {
    this.blogRequest.loadBlogs()
      .subscribe(data => {
        for (let blog of data) {
          if (this.favourite_ids.indexOf(blog.id) > -1) {
            this.favourites.push(blog);
          }
        }
      });
  }

  getUsers() {
    this.request.getUsers()
      .subscribe(data => {
        this.users = data;
        this.author = this.users[sessionStorage.user - 1];
        this.favourite_ids = this.author.favourites;
        this.getFavourites();
      })
  }

}
