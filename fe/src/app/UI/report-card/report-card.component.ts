import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { ReportAction } from '../../store/report/reports.action';
import { UserAction } from '../../store';

@Component({
  selector: 'app-report-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './report-card.component.html',
  styleUrl: './report-card.component.scss',
})
export class ReportCardComponent implements OnInit {
  @Input() report: any;
  @Input() reportAction: boolean = false;
  @Output() onReportAction = new EventEmitter<{
    reportId: any;
    action: string;
    reportStatus: string;
  }>();
  reportType: string = '';
  reportStatus: string = '';
  isPopupVisible: boolean = false;
  userTag: string = '';
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.reportType = this.report.reportResponse.reportType;
    this.reportStatus = this.report.reportResponse.reportStatus;
  }

  openPopup() {
    this.isPopupVisible = true;
  }
  closePopup() {
    this.isPopupVisible = false;
  }

  handleReportAction(reportId: any, action: string, reportStatus: string) {
    this.onReportAction.emit({ reportId, action, reportStatus });
    this.closePopup();
  }
}
