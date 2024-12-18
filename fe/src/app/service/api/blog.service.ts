import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrl: string;
  private userApiUrl: string;
  private httpOptions = {
    withCredentials: true,
  };

  constructor(
    private http: HttpClient,
    @Inject(String) apiUrl: string,
  ) {
    this.apiUrl = `${apiUrl}/blogs`;
    this.userApiUrl = apiUrl;
  }

  getBlogs(): Observable<any> {
    return this.http.get(this.apiUrl, { withCredentials: true });
  }

  createBlog(blog: any): Observable<any> {
    return this.http.post(this.apiUrl, blog, this.httpOptions);
  }

  updateBlog(id: any, blog: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, blog, this.httpOptions);
  }

  deleteBlog(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getBlogById(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, this.httpOptions);
  }

  getBlogByUser(id: any): Observable<any> {
    return this.http.get(
      `${this.userApiUrl}/users/${id}/blogs`,
      this.httpOptions,
    );
  }

  getBlogVote(blogId: any): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/${blogId}/user/is-voted`,
      this.httpOptions,
    );
  }

  voteBlog(blogId: any, voteType: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${blogId}/user/votes?voteType=${voteType}`,
      {},
      this.httpOptions,
    );
  }

  unvoteBlog(blogId: any): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${blogId}/user/votes`,
      this.httpOptions,
    );
  }
}
