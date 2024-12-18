import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlogService } from './api/blog.service';
import { TagsService } from './api/tags.service';
import { AuthService } from './auth/auth.service';
import { UserService } from './api/user.service';
import { CookieService } from 'ngx-cookie-service';
import { CategoriesService } from './api/categories.service';
import { CommentService } from './api/comment.service';
import { environment } from '../../environments/environment';
import { ReportService } from './api/report.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  public blog: BlogService;
  public tags: TagsService;
  public auth: AuthService;
  public user: UserService;
  public category: CategoriesService;
  public comment: CommentService;
  public reports: ReportService;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {
    this.blog = new BlogService(http, this.apiUrl);
    this.tags = new TagsService(http, this.apiUrl);
    this.auth = new AuthService(http, this.apiUrl, cookieService);
    this.user = new UserService(http, this.apiUrl);
    this.category = new CategoriesService(http, this.apiUrl);
    this.comment = new CommentService(http, this.apiUrl);
    this.reports = new ReportService(http, this.apiUrl);
  }
}
