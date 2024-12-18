import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { CategorysAction } from '../../../store/category/category.actions';
import { CommonModule } from '@angular/common';
import { BlogCardComponent } from '../../../UI/Blog/blog-card/blog-card.component';
import { SideBarComponent } from '../../../UI/side-bar/side-bar.component';
import { Observable } from 'rxjs';
import { Blog, BlogState } from '../../../store/blog/blog.state';
import { BlogAction } from '../../../store/blog/blog.action';

@Component({
  selector: 'app-bookmark-blogs',
  standalone: true,
  imports: [CommonModule, BlogCardComponent, SideBarComponent],
  templateUrl: './bookmark-blogs.component.html',
  styleUrl: './bookmark-blogs.component.scss',
})
export class BookmarkBlogsComponent {
  displayedBlog: any[] = [];
  blogs$: Observable<Blog[]>;
  constructor(private store: Store) {
    this.blogs$ = this.store.select(BlogState.bookmarkedBlogs);
    this.store.dispatch(new BlogAction.GetBlogByUserBookmark());
    this.blogs$.subscribe((blogs: Blog[]) => {
      this.displayedBlog = blogs;
    });
  }
}
