export enum Actions {
  GET_ALL_USER = '[User] Get all user',
  GET_USER_BY_TAG = '[User] Get user by nametag',
  GET_ME = '[User] get user',

  BOOKMARK = '[User] bookmark',
  UNBOOKMARK = '[User] unbookmark',
  IS_BOOKMARK = '[User] is bookmark',

  IS_FOLLOW = '[User] is follow',
  FOLLOW = '[User] follow',
  UNFOLLOW = '[User] unfollow',

  CHANGE_PASSWORD = '[User] change password',
  UPDATE_USER = '[User] update user',

  USER_INSIGHT = '[User] user insight',
}
export namespace UserAction {
  export class getAllUser {
    static type = Actions.GET_ALL_USER;
  }
  export class getUserbyNameTag {
    static type = Actions.GET_USER_BY_TAG;
    constructor(public payload: any) {}
  }

  export class getMe {
    static type = Actions.GET_ME;
  }

  export class bookmark {
    static type = Actions.BOOKMARK;
    constructor(public payload: any) {}
  }
  export class unbookmark {
    static type = Actions.UNBOOKMARK;
    constructor(public payload: any) {}
  }

  export class isFollow {
    static type = Actions.IS_FOLLOW;
    constructor(public payload: any) {}
  }

  export class isBookmark {
    static type = Actions.IS_BOOKMARK;
    constructor(public payload: any) {}
  }

  export class follow {
    static type = Actions.FOLLOW;
    constructor(public payload: any) {}
  }

  export class unfollow {
    static type = Actions.UNFOLLOW;
    constructor(public payload: any) {}
  }

  export class changePassword {
    static type = Actions.CHANGE_PASSWORD;
    constructor(public payload: any) {}
  }

  export class updateUser {
    static type = Actions.UPDATE_USER;
    constructor(public payload: any) {}
  }

  export class userInsight {
    static type = Actions.USER_INSIGHT;
  }
}
