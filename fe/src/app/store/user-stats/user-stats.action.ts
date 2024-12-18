enum Actions {
    GET_USER_STATS = '[User Stats] get user stats',
  }
  export namespace UserStatsAction {
    export class getUserStats {
      static type = Actions.GET_USER_STATS;
      constructor(public payload: any) {}
    }
  }
  