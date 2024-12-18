import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ReportState } from '../../store/report/reports.state';
import { ReportAction } from '../../store/report/reports.action';
import { ReportCardComponent } from '../../UI/report-card/report-card.component';

@Component({
  selector: 'app-report-user',
  standalone: true,
  imports: [CommonModule, ReportCardComponent],
  templateUrl: './report-user.component.html',
  styleUrl: './report-user.component.scss',
})
export class ReportUserComponent {
  pendingReports$: Observable<any[]>;
  cancelReports$: Observable<any[]>;
  deleteReports$: Observable<any[]>;
  pendingReports: any[] = [];
  cancelReports: any[] = [];
  deleteReports: any[] = [];

  pendingCurrentPage = 0;
  cancelCurrentPage = 0;
  deleteCurrentPage = 0;
  itemsPerPage = 8;

  constructor(private store: Store) {
    this.pendingReports$ = this.store.select(ReportState.pendingReports);
    this.cancelReports$ = this.store.select(ReportState.cancelReports);
    this.deleteReports$ = this.store.select(ReportState.deleteReports);

    this.loadReports();

    this.pendingReports$.subscribe((data) => {
      this.pendingReports = data;
    });
    this.cancelReports$.subscribe((data) => {
      this.cancelReports = data;
    });
    this.deleteReports$.subscribe((data) => {
      this.deleteReports = data;
    });
  }

  loadReports() {
    this.store.dispatch(
      new ReportAction.GetReportByStatus(
        'PENDING',
        this.pendingCurrentPage,
        'USER',
      ),
    );
    this.store.dispatch(
      new ReportAction.GetReportByStatus(
        'CANCEL',
        this.cancelCurrentPage,
        'USER',
      ),
    );
    this.store.dispatch(
      new ReportAction.GetReportByStatus(
        'DELETE',
        this.deleteCurrentPage,
        'USER',
      ),
    );
  }

  onPageChange(page: number, type: 'pending' | 'cancel' | 'delete') {
    switch (type) {
      case 'pending':
        this.pendingCurrentPage = page;
        this.store.dispatch(
          new ReportAction.GetReportByStatus('PENDING', page, 'USER'),
        );
        break;
      case 'cancel':
        this.cancelCurrentPage = page;
        this.store.dispatch(
          new ReportAction.GetReportByStatus('CANCEL', page, 'USER'),
        );
        break;
      case 'delete':
        this.deleteCurrentPage = page;
        this.store.dispatch(
          new ReportAction.GetReportByStatus('DELETE', page, 'USER'),
        );
        break;
    }
  }

  reportAction(event: { reportId: any; action: string; reportStatus: string }) {
    this.store.dispatch(
      new ReportAction.UpdateReport(
        event.reportId,
        event.action,
        'USER',
        event.reportStatus,
      ),
    );
  }
}
