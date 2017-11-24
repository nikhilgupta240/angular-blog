import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from "../user.service";

@Component({
  selector: 'app-blog-list-item',
  templateUrl: './blog-list-item.component.html',
  styleUrls: ['./blog-list-item.component.css']
})
export class BlogListItemComponent implements OnInit {

  @Input('blog') blog;
  @Input('users') users;
  @Input('user') user;
  @Input('editable') isEditable;
  @Output() blogToBeEdited: EventEmitter<any> = new EventEmitter();
  @Output() blogToBeDeleted: EventEmitter<any> = new EventEmitter();
  isFavourite: boolean = false;
  author: any;

  constructor(private request: UserService) {

  }

  ngOnInit() {
    this.getAuthor();
    this.checkFavourite();
  }

  getAuthor() {
    this.author = this.users[this.blog.author_id - 1];
  }

  checkFavourite() {
    if (this.user != null) {
      if (this.user.favourites.indexOf(this.blog.id) > -1) {
        this.isFavourite = true;
      }
    }
  }

  toggleFavourite() {
    if (this.isFavourite) {
      this.user.favourites.splice(this.user.favourites.indexOf(this.blog.id), 1);
    } else {
      this.user.favourites.push(this.blog.id);
    }
    this.isFavourite = !this.isFavourite;

    this.request.updateUser(this.user)
      .subscribe(data => {
      });
  }

  sendBlogToEdit(blog) {
    this.blogToBeEdited.emit(blog);
  }

  sendBlogToDelete(blog) {
    this.blogToBeDeleted.emit(blog);
  }

}
