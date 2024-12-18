import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ApiService } from '../../service/api.service';
import { UserAction } from './user.action';
import { tap } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

export interface User {
  id: string;
  username: string;
  avatar: string;
  bio: string;
  nameTag: string;
  roles?: string[];
}

export interface UserStateModel {
  user: User;
  userProfile: User;
  userBlog: User;
  currentRole: any;
  status: boolean;
  isFollow: boolean;
  isBookmark: boolean;
  updateStatus: boolean;
  insight: any;
}
@State<UserStateModel>({
  name: 'user',
  defaults: {
    user: {
      id: '',
      username: '',
      avatar: '',
      bio: '',
      nameTag: '',
      roles: [],
    },
    userProfile: {
      id: '',
      username: '',
      avatar: '',
      bio: '',
      nameTag: '',
    },
    userBlog: {
      id: '',
      username: '',
      avatar: '',
      bio: '',
      nameTag: '',
    },
    currentRole: '',
    status: false,
    isFollow: false,
    isBookmark: false,
    updateStatus: false,
    insight: {},
  },
})
@Injectable()
export class UserState {
  constructor(
    private apiService: ApiService,
    private msg: NzMessageService,
  ) {}

  @Selector()
  static user({ user }: UserStateModel): any {
    return user;
  }

  @Selector()
  static updateStatus({ updateStatus }: UserStateModel): boolean {
    return updateStatus;
  }

  @Selector()
  static userProfile({ userProfile }: UserStateModel): any {
    return userProfile;
  }

  @Selector()
  static userBlog({ userBlog }: UserStateModel): any {
    return userBlog;
  }

  @Selector()
  static status({ status }: UserStateModel): boolean {
    return status;
  }

  @Selector()
  static isFollow({ isFollow }: UserStateModel): boolean {
    return isFollow;
  }

  @Selector()
  static isBookmark({ isBookmark }: UserStateModel): boolean {
    return isBookmark;
  }

  @Selector()
  static insight({ insight }: UserStateModel): any {
    return insight;
  }

  @Selector()
  static currentRole({ currentRole }: UserStateModel): any {
    return currentRole;
  }

  @Action(UserAction.getMe)
  getMe(ctx: StateContext<UserStateModel>) {
    return this.apiService.user.getMe().pipe(
      tap((response) => {
        const user = response.result;
        ctx.patchState({ user: user });
        ctx.patchState({ currentRole: user.roles[0] });
      }),
    );
  }
  @Action(UserAction.getUserbyNameTag)
  getUserbyNameTag(
    ctx: StateContext<UserStateModel>,
    action: UserAction.getUserbyNameTag,
  ) {
    return this.apiService.user.getUserByTag(action.payload.nameTag).pipe(
      tap((response) => {
        if (action.payload.type === 'profile') {
          ctx.patchState({ userProfile: response.result });
        } else ctx.patchState({ userBlog: response.result });
      }),
    );
  }

  @Action(UserAction.updateUser)
  updateUser(ctx: StateContext<UserStateModel>, action: UserAction.updateUser) {
    return this.apiService.user.updateUser(action.payload).pipe(
      tap((response) => {
        if (response.code === 200) {
          this.msg.success('Profile updated');
          ctx.patchState({ userProfile: response.result, updateStatus: true });
          const user = response.result;
          localStorage.setItem('userId', user.id);
          localStorage.setItem('nameTag', user.nameTag);
          localStorage.setItem('name', user.username);
          localStorage.setItem('avatar', user.avatar);
          localStorage.setItem('bio', user.bio);
        } else {
          this.msg.error('Please check the profile again');
        }
      }),
    );
  }

  @Action(UserAction.bookmark)
  bookmark(ctx: StateContext<UserStateModel>, action: UserAction.bookmark) {
    return this.apiService.user.bookmark(action.payload).pipe(
      tap((response) => {
        if (response.code === 200) {
          ctx.patchState({ isBookmark: true });
        }
      }),
    );
  }

  @Action(UserAction.unbookmark)
  unbookmark(ctx: StateContext<UserStateModel>, action: UserAction.unbookmark) {
    return this.apiService.user.unbookmark(action.payload).pipe(
      tap((response) => {
        if (response.code === 200) {
          ctx.patchState({ isBookmark: false });
        }
      }),
    );
  }

  @Action(UserAction.isFollow)
  isFollow(ctx: StateContext<UserStateModel>, action: UserAction.isFollow) {
    return this.apiService.user.checkFollow(action.payload).pipe(
      tap((response) => {
        ctx.patchState({ isFollow: response.result });
      }),
    );
  }

  @Action(UserAction.isBookmark)
  isBookmark(ctx: StateContext<UserStateModel>, action: UserAction.isBookmark) {
    return this.apiService.user.checkBookmark(action.payload).pipe(
      tap((response) => {
        ctx.patchState({ isBookmark: response.result });
      }),
    );
  }

  @Action(UserAction.follow)
  follow(ctx: StateContext<UserStateModel>, action: UserAction.follow) {
    return this.apiService.user.follow(action.payload).pipe(
      tap((response) => {
        if (response.code === 200) {
          ctx.patchState({ isFollow: true });
        }
      }),
    );
  }

  @Action(UserAction.unfollow)
  unfollow(ctx: StateContext<UserStateModel>, action: UserAction.unfollow) {
    return this.apiService.user.unfollow(action.payload).pipe(
      tap((response) => {
        if (response.code === 200) {
          ctx.patchState({ isFollow: false });
        }
      }),
    );
  }

  @Action(UserAction.changePassword)
  changePassword(
    ctx: StateContext<UserStateModel>,
    action: UserAction.changePassword,
  ) {
    return this.apiService.user
      .changePassword(action.payload.oldPassword, action.payload.newPassword)
      .pipe(
        tap((response) => {
          console.log(response);
          if (response.code == 200) {
            this.msg.success('Password updated');
          } else {
            this.msg.error('Please check the password again');
          }
        }),
      );
  }

  @Action(UserAction.userInsight)
  userInsight(ctx: StateContext<UserStateModel>) {
    return this.apiService.user.getInsight().pipe(
      tap((response) => {
        ctx.patchState({ insight: response.result });
      }),
    );
  }
}
