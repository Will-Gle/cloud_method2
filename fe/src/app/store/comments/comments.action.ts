export enum Actions {
  GET_COMMENT = '[COMMENT] Get blog comment',
  CREATE_COMMENT = '[COMMENT] Create blog comment',
  DELETE_COMMENT = '[COMMENT] Delete blog comment',
  UPDATE_COMMENT = '[COMMENT] Update blog comment',
}
export namespace CommentsAction {
  export class GetComment {
    static type = Actions.GET_COMMENT;
    constructor(public payload: any) {}
  }
  export class CreateComment {
    static type = Actions.CREATE_COMMENT;
    constructor(public payload: any) {}
  }
  export class DeleteComment {
    static type = Actions.DELETE_COMMENT;
    constructor(public payload: any) {}
  }
  export class UpdateComment {
    static type = Actions.UPDATE_COMMENT;
    constructor(public payload: any) {}
  }
}
