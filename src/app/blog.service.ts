import {Injectable} from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map'

const BASE_URL = 'http://localhost:3000/';
const BLOG_DB = 'blogs/';
const CATEGORIES_DB = 'categories/';
const LOGO_DB = 'logos/';
const header = {headers: new Headers({'Content-Type': 'application/json'})};

@Injectable()
export class BlogService {

  constructor(private http: Http) {
  }

  // BLOG API'S
  // GET THE LIST OF ALL BLOGS
  loadBlogs() {
    return this.http.get(`${BASE_URL}${BLOG_DB}`)
      .map(res => res.json());
  }

  loadBlog(id) {
    return this.http.get(`${BASE_URL}${BLOG_DB}${id}`)
      .map(res => res.json());
  }

  loadUserBlogs(user_id) {
    return this.http.get(`${BASE_URL}${BLOG_DB}?author_id=${user_id}`)
      .map(res => res.json())
  }

  // POST A NEW BLOG
  postBlog(blogData) {
    return this.http.post(`${BASE_URL}${BLOG_DB}`, blogData, header)
      .map(res => res.json());
  }

  // EDIT AN EXISTING BLOG
  updateBlog(blog) {
    return this.http.patch(`${BASE_URL}${BLOG_DB}${blog.id}`, blog, header)
      .map(res => res.json());
  }

  // DELETE AN EXISTING BLOG
  deleteBlog(id) {
    return this.http.delete(`${BASE_URL}${BLOG_DB}${id}`)
      .map(res => res.json());
  }

  // CATEGORY API'S
  loadCategories() {
    return this.http.get(`${BASE_URL}${CATEGORIES_DB}`)
      .map(res => res.json());
  }

  loadLogos() {
    return this.http.get(`${BASE_URL}${LOGO_DB}`)
      .map(res => res.json());
  }
}
