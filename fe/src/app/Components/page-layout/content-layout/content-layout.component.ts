import { CommonModule } from '@angular/common';
import {
  ApplicationRef,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { ApiService } from '../../../service/api.service';
import { Store } from '@ngxs/store';
import { BlogAction } from '../../../store/blog/blog.action';
import { CreateBlogComponent } from '../../../UI/createBlog/create-blog/create-blog.component';
import { AuthAction } from '../../../store/auth/auth.action';
import { Observable, Subject, combineLatest, map, takeUntil } from 'rxjs';
import { AuthState } from '../../../store/auth/auth.state';
import { CookieService } from 'ngx-cookie-service';
import { Blog, BlogState } from '../../../store/blog/blog.state';
import { User, UserState } from '../../../store/user/user.state';
import { UserAction } from '../../../store/user/user.action';

@Component({
  selector: 'app-content-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzIconModule,
    NzLayoutModule,
    NzDropDownModule,
    CreateBlogComponent,
  ],
  templateUrl: './content-layout.component.html',
  styleUrl: './content-layout.component.scss',
})
export class ContentLayoutComponent {
  isCreatePopupVisible = false;
  existingBlog?: Blog;

  isLogin = false;
  blogs: Blog[] = [];
  filteredBlogs: Blog[] = [];
  searchTerm: string = '';
  searching = false;
  userName: string | null = null;
  userAvt: string | null = null;
  userNameTag: string | null = null;
  userProfile$: Observable<User>;
  currentRole: string | null = null;
  private destroy$ = new Subject<void>();

  navbarItems = [
    // { icon: 'bell', path: '' },
    { icon: 'user', path: '/account' },
  ];

  constructor(
    private store: Store,
    private router: Router,
    private cookieService: CookieService,
  ) {
    this.userProfile$ = this.store.select(UserState.user);
    this.store.select(BlogState.blogs).subscribe((blogs) => {
      this.blogs = blogs;
      this.filteredBlogs = blogs;
    });

    this.store.dispatch(new BlogAction.GetBlogs());
    if (
      localStorage.getItem('userId') !== 'undefined' &&
      localStorage.getItem('userId') !== null
    ) {
      this.store.dispatch(new UserAction.getMe());
    }

    const token = this.cookieService.get('authToken');
    if (token) {
      this.userProfile$.subscribe((response) => {
        setTimeout(() => {
          localStorage.setItem('name', response.username);
          localStorage.setItem('userId', response.id);
          localStorage.setItem('avatar', response.avatar);
          localStorage.setItem('nameTag', response.nameTag);
          localStorage.setItem('bio', response.bio);

          this.userName = response.username || localStorage.getItem('name');
          this.userAvt = response.avatar || localStorage.getItem('avatar');
          this.userNameTag =
            response.nameTag || localStorage.getItem('nameTag');
          this.currentRole = this.store.selectSnapshot(
            UserState.currentRole,
          ).name;
        }, 1000);
      });

      this.isLogin = true;
    }
  }

  openCreatePopup() {
    this.isCreatePopupVisible = true;
  }
  closeCreatePopup() {
    this.isCreatePopupVisible = false;
    this.existingBlog = undefined;
  }

  onEditBlog(blog: Blog) {
    this.existingBlog = blog;
    this.openCreatePopup();
  }

  onSearch(event: any) {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm = inputElement.value;
    this.filteredBlogs = this.blogs.filter((blog) =>
      blog.title.toLowerCase().includes(this.searchTerm.toLowerCase()),
    );
  }

  onLogout() {
    this.store.dispatch(new AuthAction.Logout());
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectBlog(blog: Blog) {
    this.router.navigate(['/blog', blog.id]);
    this.searchTerm = '';
  }
}
