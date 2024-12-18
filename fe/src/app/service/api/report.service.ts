import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private apiUrl: string;
  private httpOptions = {
    withCredentials: true,
  };

  constructor(
    private http: HttpClient,
    @Inject(String) apiUrl: string,
  ) {
    this.apiUrl = `${apiUrl}/reports`;
  }

  getReport(page: number, size: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}?page=${page}&size=${8}`,
      this.httpOptions,
    );
  }

  getReportByStatus(
    reportStatus: string,
    page: number,
    reportType: string,
  ): Observable<any> {
    return this.http.get(
      `${this.apiUrl}?page=${page}&size=${8}&reportStatus=${reportStatus}&reportType=${reportType}`,
      this.httpOptions,
    );
  }

  updateReport(reportId: string, reportStatus: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${reportId}?reportStatus=${reportStatus}`,
      {},
      this.httpOptions,
    );
  }

  createReport(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, payload, this.httpOptions);
  }
}
