import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ApiService } from '../../service/api.service';
import { tap } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserStatsAction } from './user-stats.action';

export interface UserStats {
  id: string;
  followers: number;
  following: number;
  posts: number;
  totalUpvote: number;
}

export interface UserStatsStateModel {
  userStats: UserStats;
}
@State<UserStatsStateModel>({
  name: 'UserStats',
  defaults: {
    userStats: {
      id: '',
      followers: 0,
      following: 0,
      posts: 0,
      totalUpvote: 0,
    },
  },
})
@Injectable()
export class UserStatsState {
  constructor(
    private apiService: ApiService,
    private msg: NzMessageService,
  ) {}

  @Selector()
  static userStats({ userStats }: UserStatsStateModel): UserStats {
    return userStats;
  }

  @Action(UserStatsAction.getUserStats)
  getUserStats(
    ctx: StateContext<UserStatsStateModel>,
    action: UserStatsAction.getUserStats,
  ) {
    return this.apiService.user.getUserStats(action.payload).pipe(
      tap((response) => {
        if (response.code == 200) {
          ctx.patchState({ userStats: response.result });
          // this.msg.success('User Stats fetched successfully');
        } else {
          // this.msg.error('Failed to fetch User Stats');
        }
      }),
    );
  }
}
