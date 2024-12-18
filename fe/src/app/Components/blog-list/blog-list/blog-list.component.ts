import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogCardComponent } from '../../../UI/Blog/blog-card/blog-card.component';
import { SideBarComponent } from '../../../UI/side-bar/side-bar.component';
import { Blog, BlogState } from '../../../store/blog/blog.state';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { Tags, TagsState } from '../../../store/tags/tags.state';
import { TagsAction } from '../../../store/tags/tags.actions';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CategorysAction } from '../../../store/category/category.actions';
import { CategoryState } from '../../../store/category/category.state';
import { Router } from '@angular/router';
import { BlogAction } from '../../../store/blog/blog.action';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [
    CommonModule,
    BlogCardComponent,
    SideBarComponent,
    NzSelectModule,
    FormsModule,
    NzIconModule,
  ],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss',
})
export class BlogListComponent implements OnInit {
  selectedArticle: any | null = null;
  selectedTag: string[] = [];

  blog$!: Observable<Blog[]>;
  tags$!: Observable<any>;
  blogsByTag$!: Observable<Blog[]>;
  loading: boolean = true;
  displayedBlog: Blog[] = [];
  constructor(private store: Store) {
    this.blog$ = this.store.select(BlogState.blogs);
    this.tags$ = this.store.select(TagsState.tags);
    this.blogsByTag$ = this.store.select(TagsState.getBlogByTag);
    this.blog$.subscribe((blogs: Blog[]) => {
      this.displayedBlog = blogs;
      this.loading = false;
    });
  }

  ngOnInit() {
    this.store.dispatch(new TagsAction.GetTags());
  }

  filterByTag(tags: Tags[] | null) {
    if (tags && tags.length > 0) {
      const firstTagid = tags[0].id;
      this.selectedTag = tags.map((tag) => tag.id);
      const payload = {
        tags: this.selectedTag,
        tagid: firstTagid,
      };
      this.store.dispatch(new TagsAction.GetBlogByTag(payload));
      this.blogsByTag$.subscribe((blogs: Blog[]) => {
        if (blogs && blogs.length > 0) {
          this.displayedBlog = blogs;
        } else {
          this.displayedBlog = [];
        }
        this.loading = false;
      });
    } else {
      this.blog$.subscribe((blogs: Blog[]) => {
        this.displayedBlog = blogs;
        this.loading = false;
      });
    }
  }

  // openPopup(article: any) {
  //   this.selectedArticle = article;
  // }

  // closePopup() {
  //   this.selectedArticle = null;
  //   this.store.dispatch(new BlogAction.GetBlogs());
  // }
}
