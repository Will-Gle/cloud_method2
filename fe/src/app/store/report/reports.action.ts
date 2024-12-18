export enum Actions {
  GET_REPORT = '[REPORT] Get blog report',
  CREATE_REPORT = '[REPORT] Create blog report',
  UPDATE_REPORT = '[REPORT] Update blog report',
  GET_REPORT_BY_STATUS = '[REPORT] Get blog report by status',
}
export namespace ReportAction {
  export class GetReport {
    static type = Actions.GET_REPORT;
    constructor() {}
  }
  export class CreateReport {
    static type = Actions.CREATE_REPORT;
    constructor(public payload: any) {}
  }
  export class UpdateReport {
    static type = Actions.UPDATE_REPORT;
    constructor(
      public reportId: any,
      public reportStatus: any,
      public reportType: any,
      public currentStatus?: any,
    ) {}
  }

  export class GetReportByStatus {
    static type = Actions.GET_REPORT_BY_STATUS;
    constructor(
      public reportStatus: any,
      public page: any,
      public reportType: any,
    ) {}
  }
}
