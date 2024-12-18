export enum Actions {
  GET_BLOGS = '[Blog] get all blog',
  CREATE_BLOG = '[Blog] create blog',
  UPDATE_BLOG = '[Blog] update blog',
  DELETE_BLOG = '[Blog] delete blog',
  GET_BLOG_BY_ID = '[Blog] get blog by id',
  GET_BLOG_BY_USER = '[Blog] get blog by user',
  GET_BLOG_BY_USER_BOOKMARK = '[Blog] get blog by user bookmark',
  CHECK_USER_VOTE = '[Blog] check user vote in blog',
  VOTE_BLOG = '[Blog] vote blog',
  UNVOTE_BLOG = '[Blog] unvote blog',
}
export namespace BlogAction {
  export class GetBlogs {
    static type = Actions.GET_BLOGS;
  }
  export class CreateBlog {
    static type = Actions.CREATE_BLOG;
    constructor(public payload: any) {}
  }

  export class UpdateBlog {
    static type = Actions.UPDATE_BLOG;
    constructor(
      public id: any,
      public payload: any,
    ) {}
  }
  export class DeleteBlog {
    static type = Actions.DELETE_BLOG;
    constructor(
      public blogId: any,
      public userId: any,
    ) {}
  }
  export class GetBlogById {
    static type = Actions.GET_BLOG_BY_ID;
    constructor(public payload: any) {}
  }
  export class GetBlogByUser {
    static type = Actions.GET_BLOG_BY_USER;
    constructor(public payload: any) {}
  }

  export class GetBlogByUserBookmark {
    static type = Actions.GET_BLOG_BY_USER_BOOKMARK;
  }

  export class GetVoteByBlog {
    static type = Actions.CHECK_USER_VOTE;
    constructor(public payload: any) {}
  }
  export class VoteBlog {
    static type = Actions.VOTE_BLOG;
    constructor(public payload: any) {}
  }
  export class UnvoteBlog {
    static type = Actions.UNVOTE_BLOG;
    constructor(public payload: any) {}
  }
}
