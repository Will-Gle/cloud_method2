import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SideBarComponent } from '../../../UI/side-bar/side-bar.component';
import { BlogCardComponent } from '../../../UI/Blog/blog-card/blog-card.component';
import { Observable } from 'rxjs';
import { Blog } from '../../../store/blog/blog.state';
import { Store } from '@ngxs/store';
import { CategoryState } from '../../../store/category/category.state';
import { CategorysAction } from '../../../store/category/category.actions';

@Component({
  selector: 'app-discover-blogs',
  standalone: true,
  imports: [CommonModule, SideBarComponent, BlogCardComponent],
  templateUrl: './discover-blogs.component.html',
  styleUrl: './discover-blogs.component.scss',
})
export class DiscoverBlogsComponent {
  categoryId: string | null = null;
  categoryTitle: string | null = null;
  displayedBlog: any[] = [];
  blogs$: Observable<Blog[]>;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
  ) {
    this.route.params.subscribe((params) => {
      this.categoryTitle = params['title'];
      this.categoryId = params['id'];
    });
    this.blogs$ = this.store.select(CategoryState.getBlogByCategory);
    this.store.dispatch(new CategorysAction.GetBlogByCategory(this.categoryId));
    this.blogs$.subscribe((blogs: Blog[]) => {
      this.displayedBlog = blogs;
    });
  }
}
