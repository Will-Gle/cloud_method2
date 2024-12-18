// src/store/blogs.state.ts
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ApiService } from '../../service/api.service';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { Blog } from '../blog/blog.state';
import { CategorysAction } from './category.actions';

export interface Category {
  id: string;
  title: string;
  blogs: Blog[];
}

export interface CategoryStateModel {
  categories: Category[];
  status: boolean;
  blogByCategory: Blog[];
}

@State<CategoryStateModel>({
  name: 'Categories',
  defaults: {
    categories: [],
    status: false,
    blogByCategory: [],
  },
})
@Injectable()
export class CategoryState {
  constructor(private apiService: ApiService) {}

  @Selector()
  static categories({ categories }: CategoryStateModel): Category[] {
    return categories || [];
  }
  @Selector()
  static status({ status }: CategoryStateModel): boolean {
    return status;
  }
  @Selector()
  static getBlogByCategory({ blogByCategory }: CategoryStateModel): Blog[] {
    return blogByCategory;
  }

  @Action(CategorysAction.GetCategory)
  getCategory(ctx: StateContext<CategoryStateModel>) {
    this.apiService.category
      .getCategories()
      .pipe(
        tap((response: any) => {
          if (response.code != 200) {
            return;
          }
          const categories: Category[] = response.result;
          ctx.patchState({ categories, status: false });
        }),
      )
      .subscribe();
  }

  @Action(CategorysAction.GetBlogByCategory)
  getBlogByCategory(
    ctx: StateContext<CategoryStateModel>,
    action: CategorysAction.GetBlogByCategory,
  ) {
    this.apiService.category
      .getBlogbyCategory(action.payload)
      .pipe(
        tap((response: any) => {
          const blogByCategory: Blog[] = response.result.blogs;
          ctx.patchState({ blogByCategory, status: false });
        }),
      )
      .subscribe();
  }
  @Action(CategorysAction.CreateCategory)
  createCategory(
    ctx: StateContext<CategoryStateModel>,
    action: CategorysAction.CreateCategory,
  ) {
    this.apiService.category
      .createCategory(action.payload)
      .pipe(
        tap((response: any) => {
          if (response.code != 200) {
            return;
          }
          ctx.dispatch(new CategorysAction.GetCategory());
          ctx.patchState({ status: true });
        }),
        catchError((error) => {
          return throwError(error);
        }),
      )
      .subscribe();
  }
}
