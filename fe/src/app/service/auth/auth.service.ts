import { Injectable, Inject, inject } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string;
  private httpOptions = {
    withCredentials: true,
  };
  router = inject(Router);

  constructor(
    private http: HttpClient,
    @Inject(String) apiUrl: string,
    private cookieService: CookieService,
  ) {
    this.apiUrl = `${apiUrl}`;
  }

  Login(info: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, info, {
      withCredentials: true,
    });
  }

  Register(info: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/auth/register`,
      info,
      this.httpOptions,
    );
  }

  RefreshToken(): Observable<any> {
    this.cookieService.delete('authToken', '/');
    return this.http.post(
      `${this.apiUrl}/auth/refresh-token`,
      {},
      this.httpOptions,
    );
  }

  setToken(token: string) {
    this.cookieService.set('authToken', token, 7, '/', '', true, 'Strict');
  }

  getToken(): string | null {
    return this.cookieService.get('authToken');
  }

  Logout(): Observable<any> {
    this.cookieService.delete('authToken', '/');
    return this.http.post(`${this.apiUrl}/auth/logout`, {}, this.httpOptions);
  }
}
