import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BlogCardComponent } from '../../UI/Blog/blog-card/blog-card.component';
import { SideBarComponent } from '../../UI/side-bar/side-bar.component';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { User, UserState } from '../../store/user/user.state';
import { Blog, BlogState } from '../../store/blog/blog.state';
import { BlogAction } from '../../store/blog/blog.action';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserAction } from '../../store/user/user.action';
import { UserStats, UserStatsAction, UserStatsState } from '../../store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportAction } from '../../store/report/reports.action';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ReportBlogComponent } from '../../UI/report-blog/report-blog.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    BlogCardComponent,
    SideBarComponent,
    RouterLink,
    NzIconModule,
    NzModalModule,
    ReportBlogComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  // user$: Observable<any>;
  reportForm: FormGroup;
  userId: string = '';
  userName: string | null = null;
  userBlog$: Observable<Blog[]>;
  isProfile: boolean = false;
  userBio: string = '';
  userAvt: string = '';
  userBlogId: string = '';
  userNameTag: string = '';
  userProfile$: Observable<User>;
  isFollow$: Observable<boolean>;
  user$: Observable<User>;
  isFollowing: boolean = false;
  followers: number = 0;
  following: number = 0;
  totalUpvote: number = 0;
  posts: number = 0;
  isModalVisible = false;
  constructor(
    private _store: Store,
    private _route: ActivatedRoute,
    private _msg: NzMessageService,
    private _fb: FormBuilder,
  ) {
    this.reportForm = this._fb.group({
      reportType: ['USER', Validators.required],
      reportReason: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.userProfile$ = this._store.select(UserState.userProfile);
    this.userBlog$ = this._store.select(BlogState.userBlog);
    this.user$ = this._store.select(UserState.userProfile);
    this.isFollow$ = this._store.select(UserState.isFollow);
    _route.paramMap.subscribe((params) => {
      const nametag = params.get('nametag');
      if (nametag) {
        const payload = {
          nameTag: nametag,
          type: 'profile',
        };
        this._store.dispatch(new UserAction.getUserbyNameTag(payload));

        if (this.userBlogId)
          this._store.dispatch(new UserAction.isFollow(this.userBlogId));
      } else {
        this.userId = localStorage.getItem('userId') || '';
        const payload = {
          nameTag: localStorage.getItem('nameTag'),
          type: 'profile',
        };
        this._store.dispatch(new UserAction.getUserbyNameTag(payload));
        this._store.dispatch(new BlogAction.GetBlogByUser(this.userId));
        // this._store.dispatch(new UserStatsAction.getUserStats(this.userId));
      }
    });
    this.userProfile$.subscribe((response) => {
      this.userBlogId = response.id;
      this.userName = response.username;
      this.userAvt = response.avatar;
      this.userNameTag = response.nameTag;
      this.userBio = response.bio;
      if (this.userBlogId) {
        this._store.dispatch(new BlogAction.GetBlogByUser(this.userBlogId));
        this._store.dispatch(new UserStatsAction.getUserStats(this.userBlogId));
      }
    });

    this._store.select(UserStatsState.userStats).subscribe((stats) => {
      this.followers = stats.followers;
      this.following = stats.following;
      this.posts = stats.posts;
      this.totalUpvote = stats.totalUpvote;
    });
    this.isFollow$.subscribe((response) => {
      this.isFollowing = response;
      if (this.userBlogId) {
        this._store.dispatch(new UserStatsAction.getUserStats(this.userBlogId));
      }
    });
  }

  ngOnInit() {
    this._route.data.subscribe((data) => {
      this.isProfile = data['isProfile'];
    });
  }
  onFollow() {
    if (!this.CheckLogin()) return;
    if (this.isFollowing) {
      this._store.dispatch(new UserAction.unfollow(this.userBlogId));
    } else {
      this._store.dispatch(new UserAction.follow(this.userBlogId));
    }
  }
  CheckLogin(): boolean {
    if (!localStorage.getItem('userId')) {
      this._msg.info('Please login to do action');
      return false;
    }
    return true;
  }
  openReport() {
    this.isModalVisible = true;
  }
  handleCancel(): void {
    this.isModalVisible = false;
  }
  onReport(): void {
    if (!this.CheckLogin()) return;
    const payload = {
      userId: this.userBlogId,
      reportReason: this.reportForm.value.reportReason,
      reportType: this.reportForm.value.reportType,
      description: this.reportForm.value.description,
    };

    this._store.dispatch(new ReportAction.CreateReport(payload));
  }
}
