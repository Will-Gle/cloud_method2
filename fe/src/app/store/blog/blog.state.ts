// src/store/blogs.state.ts
import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { BlogAction } from './blog.action';
import { ApiService } from '../../service/api.service';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { User, UserStateModel } from '../user/user.state';
import { Category } from '../category/category.state';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserStatsAction } from '../user-stats';

export interface Votes {
  upVote: number;
  downVote: number;
}
export interface Blog {
  id: string;
  title: string;
  status: boolean;
  content: Text;
  tags: any[];
  summary: Text;
  thumbnail: string;
  createdAt: Date;
  category: Category;
  user?: User;
  votes: Votes;
}

export interface Status {
  status: boolean;
  code: number;
}

export interface BlogStateModel {
  blogs: Blog[];
  bookmarkedBlogs: Blog[];
  blog: Blog | null;
  userBlog: Blog[];
  status: Status;
  voteStatus: string;
}

@State<BlogStateModel>({
  name: 'blogs',
  defaults: {
    blogs: [],
    bookmarkedBlogs: [],
    userBlog: [],
    blog: null,
    status: {
      status: false,
      code: 0,
    },
    voteStatus: '',
  },
})
@Injectable()
export class BlogState {
  constructor(
    private apiService: ApiService,
    private store: Store,
    private msg: NzMessageService,
  ) {}

  @Selector()
  static blogs({ blogs }: BlogStateModel): Blog[] {
    return blogs;
  }
  @Selector()
  static userBlog({ userBlog }: BlogStateModel): Blog[] {
    return userBlog;
  }
  @Selector()
  static status({ status }: BlogStateModel): Status {
    return status;
  }
  @Selector()
  static blog({ blog }: BlogStateModel) {
    return blog;
  }

  @Selector()
  static bookmarkedBlogs({ bookmarkedBlogs }: BlogStateModel): Blog[] {
    return bookmarkedBlogs;
  }

  @Selector()
  static voteStatus({ voteStatus }: BlogStateModel): string {
    return voteStatus;
  }

  @Action(BlogAction.GetBlogs)
  getBlogs(ctx: StateContext<BlogStateModel>) {
    this.apiService.blog
      .getBlogs()
      .pipe(
        tap((response: any) => {
          if (response.code != 200) {
            return;
          }
          const blogs: Blog[] = response.result;
          ctx.patchState({ blogs: blogs, status: { status: false, code: 0 } });
        }),
      )
      .subscribe();
  }

  @Action(BlogAction.CreateBlog)
  createBlog(ctx: StateContext<BlogStateModel>, action: BlogAction.CreateBlog) {
    return this.apiService.blog
      .createBlog(action.payload)
      .pipe(
        tap((response) => {
          if (response.code === 200) {
            ctx.patchState({ status: { status: true, code: 200 } });
            return ctx.dispatch(new BlogAction.GetBlogs());
          } else {
            ctx.patchState({ status: { status: false, code: response.code } });
            return;
          }
        }),
        catchError((error) => {
          return throwError(error);
        }),
      )
      .subscribe();
  }

  @Action(BlogAction.UpdateBlog)
  updateBlog(ctx: StateContext<BlogStateModel>, action: BlogAction.UpdateBlog) {
    return this.apiService.blog
      .updateBlog(action.id, action.payload)
      .pipe(
        tap((response) => {
          if (response.code === 200) {
            ctx.patchState({ status: { status: true, code: 200 } });
            return ctx.dispatch(new BlogAction.GetBlogById(action.id));
          } else {
            ctx.patchState({ status: { status: false, code: response.code } });
            return;
          }
        }),
        catchError((error) => {
          return throwError(error);
        }),
      )
      .subscribe();
  }

  @Action(BlogAction.DeleteBlog)
  deleteBlog(ctx: StateContext<BlogStateModel>, action: BlogAction.DeleteBlog) {
    return this.apiService.blog
      .deleteBlog(action.blogId)
      .pipe(
        tap((response) => {
          if (response.code === 200) {
            this.msg.success('Blog deleted');
            this.store.dispatch(new BlogAction.GetBlogByUser(action.userId));
            this.store.dispatch(
              new UserStatsAction.getUserStats(action.userId),
            );
          } else {
            this.msg.error('Delete failed');
          }
        }),
      )
      .subscribe();
  }

  @Action(BlogAction.GetBlogById)
  getBlogById(
    ctx: StateContext<BlogStateModel>,
    action: BlogAction.GetBlogById,
  ) {
    this.apiService.blog
      .getBlogById(action.payload)
      .pipe(
        tap((response: any) => {
          ctx.patchState({ blog: response.result });
        }),
      )
      .subscribe();
  }

  @Action(BlogAction.GetBlogByUser)
  getBlogbyUser(
    ctx: StateContext<BlogStateModel>,
    action: BlogAction.GetBlogByUser,
  ) {
    this.apiService.blog
      .getBlogByUser(action.payload)
      .pipe(
        tap((response: any) => {
          ctx.patchState({
            userBlog: response.result.blogs.map((blog: Blog) => ({
              id: blog.id,
              title: blog.title,
              status: blog.status,
              content: blog.content,
              tags: blog.tags,
              category: blog.category,
              summary: blog.summary,
              thumbnail: blog.thumbnail,
              createdAt: blog.createdAt,
              user: {
                id: response.result.id,
                username: response.result.username,
              },
              votes: blog.votes,
            })),
          });
        }),
      )
      .subscribe();
  }

  @Action(BlogAction.GetBlogByUserBookmark)
  getBlogByUserBookmark(ctx: StateContext<BlogStateModel>) {
    this.apiService.user
      .getBookmarks()
      .pipe(
        tap((response: any) => {
          const blogs: Blog[] = response.result.blogs;
          ctx.patchState({
            bookmarkedBlogs: blogs,
          });
        }),
      )
      .subscribe();
  }

  @Action(BlogAction.GetVoteByBlog)
  getVoteByBlog(
    ctx: StateContext<BlogStateModel>,
    action: BlogAction.GetVoteByBlog,
  ) {
    this.apiService.blog
      .getBlogVote(action.payload)
      .pipe(
        tap((response: any) => {
          if (response.code === 200) {
            ctx.patchState({ voteStatus: response.result.voteType });
            // console.log(response);
          }
        }),
      )
      .subscribe();
  }

  @Action(BlogAction.VoteBlog)
  voteBlog(ctx: StateContext<BlogStateModel>, action: BlogAction.VoteBlog) {
    this.apiService.blog
      .voteBlog(action.payload.blogId, action.payload.voteType)
      .pipe(
        tap((response: any) => {
          if (response.code === 200) {
            ctx.patchState({ voteStatus: response.result.voteType });
            ctx.dispatch(new BlogAction.GetBlogById(action.payload.blogId));
          }
        }),
      )
      .subscribe();
  }

  @Action(BlogAction.UnvoteBlog)
  unvoteBlog(ctx: StateContext<BlogStateModel>, action: BlogAction.UnvoteBlog) {
    this.apiService.blog
      .unvoteBlog(action.payload)
      .pipe(
        tap((response: any) => {
          if (response.code === 200) {
            ctx.dispatch(new BlogAction.GetBlogById(action.payload));
          }
        }),
      )
      .subscribe();
  }
}
