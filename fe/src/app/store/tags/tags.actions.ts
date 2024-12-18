export enum Actions{
    GET_TAGS = '[Tags] get all tags',
    CREATE_TAG = '[Tags] create tag',
    GET_BLOG_BY_TAG = '[Tags] get blog by tag',
}
export namespace TagsAction {
    export class GetTags{
        static type = Actions.GET_TAGS;
    }
    export class CreateTag{
        static type = Actions.CREATE_TAG;
        constructor(public payload: any){}
    }
    export class GetBlogByTag{
        static type = Actions.GET_BLOG_BY_TAG;
        constructor(public payload: any){}
    }
}