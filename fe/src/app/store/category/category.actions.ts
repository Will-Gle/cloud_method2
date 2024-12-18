export enum Actions {
  GET_CATEGORY = '[CATEGORY] get all CATEGORY',
  CREATE_CATEGORY = '[CATEGORY] create CATEGORY',
  GET_BLOG_BY_CATEGORY = '[CATEGORY] get blog by CATEGORY',
}
export namespace CategorysAction {
  export class GetCategory {
    static type = Actions.GET_CATEGORY;
  }
  export class CreateCategory {
    static type = Actions.CREATE_CATEGORY;
    constructor(public payload: any) {}
  }
  export class GetBlogByCategory {
    static type = Actions.GET_BLOG_BY_CATEGORY;
    constructor(public payload: any) {}
  }
}
