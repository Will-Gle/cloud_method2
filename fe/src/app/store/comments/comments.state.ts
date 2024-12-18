import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { ApiService } from '../../service/api.service';
import { CommentsAction } from './comments.action';
import { UserState } from '../user/user.state';
import { NzMessageService } from 'ng-zorro-antd/message';

export interface Comment {
  id: string;
  content: string;
  parentId?: string;
  user?: {
    id: string;
    username: string;
    avatar: string;
  };
  update: boolean;
}
export interface CommentsStateModel {
  comments: Comment[];
  status: boolean;
}

@State<CommentsStateModel>({
  name: 'Comments',
  defaults: {
    comments: [],
    status: false,
  },
})
@Injectable()
export class CommentsState {
  constructor(
    private apiService: ApiService,
    private store: Store,
    private message: NzMessageService,
  ) {}
  @Selector()
  static comments({ comments }: CommentsStateModel): Comment[] {
    return comments;
  }

  @Action(CommentsAction.GetComment)
  getComment(
    ctx: StateContext<CommentsStateModel>,
    action: CommentsAction.GetComment,
  ) {
    this.apiService.comment
      .getComment(action.payload, 0, 10)
      .subscribe((response: any) => {
        ctx.patchState({ comments: response.result });
      });
  }

  @Action(CommentsAction.CreateComment)
  createComment(
    ctx: StateContext<CommentsStateModel>,
    action: CommentsAction.CreateComment,
  ) {
    this.apiService.comment
      .createComment(action.payload.blogId, action.payload.content)
      .subscribe((response: any) => {
        if (response.code === 200)
          this.store.dispatch(
            new CommentsAction.GetComment(action.payload.blogId),
          );
      });
  }

  @Action(CommentsAction.UpdateComment)
  updateComment(
    ctx: StateContext<CommentsStateModel>,
    action: CommentsAction.UpdateComment,
  ) {
    this.apiService.comment
      .updateComment(
        action.payload.blogId,
        action.payload.commentId,
        action.payload.content,
      )
      .subscribe((response: any) => {
        if (response.code === 200) {
          this.message.success('Comment updated');
          this.store.dispatch(
            new CommentsAction.GetComment(action.payload.blogId),
          );
        }
      });
  }

  @Action(CommentsAction.DeleteComment)
  deleteComment(
    ctx: StateContext<CommentsStateModel>,
    action: CommentsAction.DeleteComment,
  ) {
    this.apiService.comment
      .deleteComment(action.payload.blogId, action.payload.commentId)
      .subscribe((response: any) => {
        if (response.code === 200) {
          this.message.success('Comment deleted');
          this.store.dispatch(
            new CommentsAction.GetComment(action.payload.blogId),
          );
        }
      });
  }
}
