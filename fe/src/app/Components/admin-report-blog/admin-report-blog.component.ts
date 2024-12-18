import { Component } from '@angular/core';
import Iconify from '@iconify/tailwind';
import { BlogCardComponent } from '../../UI/Blog/blog-card/blog-card.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Blog, BlogState } from '../../store/blog/blog.state';
import { ReportState } from '../../store/report/reports.state';
import { ReportAction } from '../../store/report/reports.action';
import { BlogAction } from '../../store/blog/blog.action';
import { ReportCardComponent } from '../../UI/report-card/report-card.component';

@Component({
  selector: 'admin-report-blog',
  standalone: true,
  imports: [CommonModule, ReportCardComponent],
  templateUrl: './admin-report-blog.component.html',
  styleUrl: './admin-management.component.scss',
})
export class AdminReportBlogComponent {
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
        'BLOG',
      ),
    );
    this.store.dispatch(
      new ReportAction.GetReportByStatus(
        'CANCEL',
        this.cancelCurrentPage,
        'BLOG',
      ),
    );
    this.store.dispatch(
      new ReportAction.GetReportByStatus(
        'DELETE',
        this.deleteCurrentPage,
        'BLOG',
      ),
    );
  }

  onPageChange(page: number, type: 'pending' | 'cancel' | 'delete') {
    switch (type) {
      case 'pending':
        this.pendingCurrentPage = page;
        this.store.dispatch(
          new ReportAction.GetReportByStatus('PENDING', page, 'BLOG'),
        );
        break;
      case 'cancel':
        this.cancelCurrentPage = page;
        this.store.dispatch(
          new ReportAction.GetReportByStatus('CANCEL', page, 'BLOG'),
        );
        break;
      case 'delete':
        this.deleteCurrentPage = page;
        this.store.dispatch(
          new ReportAction.GetReportByStatus('DELETE', page, 'BLOG'),
        );
        break;
    }
  }

  reportAction(event: { reportId: any; action: string; reportStatus: string }) {
    this.store.dispatch(
      new ReportAction.UpdateReport(
        event.reportId,
        event.action,
        'BLOG',
        event.reportStatus,
      ),
    );
  }
}
