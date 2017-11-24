import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {HomePageComponent} from './home-page/home-page.component';
import {FavouritePageComponent} from './favourite-page/favourite-page.component';
import {BlogItemComponent} from './blog-item/blog-item.component';
import {BlogService} from "./blog.service";
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HttpClientModule} from "@angular/common/http";
import {LoginPageComponent} from './login-page/login-page.component';
import {UserService} from "./user.service";
import { MyBlogComponent } from './my-blog/my-blog.component';
import { BlogListItemComponent } from './blog-list-item/blog-list-item.component';

const appRoutes: Routes = [
  {path: "", redirectTo: '/home', pathMatch: 'full'},
  {path: "home", component: HomePageComponent},
  {path: "favourite", component: FavouritePageComponent},
  {path: "login", component: LoginPageComponent},
  {path: "myblog", component: MyBlogComponent},
  {path: "addblog", component: BlogItemComponent},
  {path: "**", component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    FavouritePageComponent,
    BlogItemComponent,
    PageNotFoundComponent,
    LoginPageComponent,
    MyBlogComponent,
    BlogListItemComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [BlogService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
