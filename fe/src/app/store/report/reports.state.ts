import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { ApiService } from '../../service/api.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ReportAction } from './reports.action';
import { tap } from 'rxjs';

export interface reportStateModel {
  reports: any[];
  pendingReports: any[];
  cancelReports: any[];
  deleteReports: any[];
  status: boolean;
}

@State<reportStateModel>({
  name: 'Reports',
  defaults: {
    reports: [],
    pendingReports: [],
    cancelReports: [],
    deleteReports: [],
    status: false,
  },
})
@Injectable()
export class ReportState {
  constructor(
    private apiService: ApiService,
    private store: Store,
    private message: NzMessageService,
  ) {}

  @Selector()
  static reports({ reports }: reportStateModel): any[] {
    return reports;
  }
  @Selector()
  static status({ status }: reportStateModel): boolean {
    return status;
  }
  @Selector()
  static pendingReports({ pendingReports }: reportStateModel): any[] {
    return pendingReports;
  }
  @Selector()
  static cancelReports({ cancelReports }: reportStateModel): any[] {
    return cancelReports;
  }
  @Selector()
  static deleteReports({ deleteReports }: reportStateModel): any[] {
    return deleteReports;
  }
  @Action(ReportAction.GetReport)
  getReport(
    ctx: StateContext<reportStateModel>,
    action: ReportAction.GetReport,
  ) {
    this.apiService.reports
      .getReport(0, 10)
      .pipe(
        tap((response: any) => {
          ctx.patchState({ reports: response.result });
        }),
      )
      .subscribe();
  }

  @Action(ReportAction.GetReportByStatus)
  getReportByStatus(
    ctx: StateContext<reportStateModel>,
    action: ReportAction.GetReportByStatus,
  ) {
    this.apiService.reports
      .getReportByStatus(action.reportStatus, action.page, action.reportType)
      .pipe(
        tap((response) => {
          if (action.reportStatus === 'PENDING') {
            ctx.patchState({ pendingReports: response.result });
          } else if (action.reportStatus === 'CANCEL') {
            ctx.patchState({ cancelReports: response.result });
          } else if (action.reportStatus === 'DELETE') {
            ctx.patchState({ deleteReports: response.result });
          }
        }),
      )
      .subscribe();
  }
  @Action(ReportAction.CreateReport)
  createReport(
    ctx: StateContext<reportStateModel>,
    action: ReportAction.CreateReport,
  ) {
    this.apiService.reports
      .createReport(action.payload)
      .pipe(
        tap((response) => {
          if (response.code !== 200) {
            return this.message.error(response.error);
          }
          this.message.success('Report submitted');
          return ctx.patchState({ reports: response.result, status: true });
        }),
      )
      .subscribe();
  }
  @Action(ReportAction.UpdateReport)
  updateReport(
    ctx: StateContext<reportStateModel>,
    payload: ReportAction.UpdateReport,
  ) {
    let reportId = payload.reportId;
    let status = payload.reportStatus;
    let type = payload.reportType;
    let currStatus = payload.currentStatus;
    this.apiService.reports
      .updateReport(reportId, status)
      .pipe(
        tap((response) => {
          if (response.code !== 200) {
            return this.message.error(response.error);
          }
          this.message.success('Report updated');
          ctx.patchState({ reports: response.result, status: true });
          this.store.dispatch(
            new ReportAction.GetReportByStatus(currStatus, 0, type),
          );
          return this.store.dispatch(
            new ReportAction.GetReportByStatus(status, 0, type),
          );
        }),
      )
      .subscribe();
  }
}
