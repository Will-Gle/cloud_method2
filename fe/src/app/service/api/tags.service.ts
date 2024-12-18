import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  private apiUrl: string;
  private httpOptions = {
    withCredentials: true
  };

  constructor(
    private http: HttpClient,
    @Inject(String) apiUrl: string,
  ) {
    this.apiUrl = `${apiUrl}/tags`;
  }

  getTags(): Observable<any> {
    return this.http.get(this.apiUrl, this.httpOptions);
  }

  createTags(tags: any): Observable<any> {
    return this.http.post(this.apiUrl, tags, this.httpOptions);
  }

  getBlogbyTag(tags: string[], tagid: string): Observable<any> {
    const options = {
      ...this.httpOptions,
      body: { tags }
    };

    return this.http.request('GET', `${this.apiUrl}/blogs/${tagid}`, options);
  }
}
