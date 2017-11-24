import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BlogService} from "../blog.service";

interface Blog {
  id: number,
  author_id: number,
  category: string,
  content: string,
  date: string,
  logo: string,
  title: string,
}

@Component({
  selector: 'app-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.css']
})
export class BlogItemComponent implements OnInit {

  categories;
  logos;
  newBlog: Blog;
  author_id;
  isEdit: boolean = false;

  constructor(private router: Router, private request: BlogService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (sessionStorage.user == 'null') {
      this.router.navigateByUrl('/home');
    }
    this.author_id = sessionStorage.user;
    this.getCategories();
    this.getLogos();
    this.initializeBlog();
  }

  initializeBlog() {
    this.newBlog = {
      id: null,
      author_id: null,
      category: null,
      content: null,
      date: null,
      logo: null,
      title: null
    };
    let blog_id = this.route.snapshot.params['id'];
    if (blog_id) {
      this.isEdit = true;
      this.request.loadBlog(blog_id)
        .subscribe(data => {
          this.newBlog = data;
        });
    }

  }

  getCategories() {
    this.request.loadCategories()
      .subscribe(data => {
        this.categories = data;
      });
  }

  getLogos() {
    this.request.loadLogos()
      .subscribe(data => {
        this.logos = data;
      });
  }

  addBlog(title, content, category) {
    this.newBlog.author_id = Number(sessionStorage.user);
    this.newBlog.category = category;
    this.newBlog.content = content;
    this.newBlog.title = title;
    this.newBlog.logo = this.logos[category];
    this.newBlog.date = new Date().toString();
    if (this.isEdit) {
      this.updateBlog(this.newBlog);
    } else {
      this.request.postBlog(this.newBlog)
        .subscribe(data => {
          this.router.navigate(['/myblog']);
        });
    }
  }

  updateBlog(blog) {
    this.request.updateBlog(blog)
      .subscribe(data => {
        this.router.navigate(['/myblog']);
      });
  }
}
