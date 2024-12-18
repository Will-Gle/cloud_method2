import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl: string;
  private httpOptions = {
    withCredentials: true
  };

  constructor(
    private http: HttpClient,
    @Inject(String) apiUrl: string,
  ) {
    this.apiUrl = `${apiUrl}/users`;
  }

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl, this.httpOptions);
  }

  getMe(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`, this.httpOptions);
  }

  getUserByTag(tag: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${tag}`, this.httpOptions);
  }

  updateUser(payload: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profiles`, payload, this.httpOptions);
  }

  getBookmarks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/bookmarks`, this.httpOptions);
  }

  bookmark(id: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/bookmarks/blog/${id}`, {}, this.httpOptions);
  }

  unbookmark(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/bookmarks/blog/${id}`, this.httpOptions);
  }

  checkFollow(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/followers/user/${id}/is-following`, this.httpOptions);
  }

  checkBookmark(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/bookmarks/blog/${id}/is-bookmarked`, this.httpOptions);
  }

  follow(targetUserId: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/followers/user`, { targetUserId }, this.httpOptions);
  }

  unfollow(targetUserId: any): Observable<any> {
    const options = {
      ...this.httpOptions,
      body: { targetUserId }
    };
    return this.http.delete(`${this.apiUrl}/followers/user`, options);
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/change-password`,
      { oldPassword, newPassword },
      this.httpOptions
    );
  }

  getUserStats(userId: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/stats/${userId}`, this.httpOptions);
  }

  getInsight(): Observable<any> {
    return this.http.get(`${this.apiUrl}/insight`);
  }
}
