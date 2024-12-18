import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ApiService } from '../../../service/api.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BlogDetailComponent } from '../../../Components/blog-detail/blog-detail.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { Blog } from '../../../store/blog/blog.state';
import { CreateBlogComponent } from '../../createBlog/create-blog/create-blog.component';
import { Store } from '@ngxs/store';
import { BlogAction } from '../../../store/blog/blog.action';

@Component({
  selector: 'app-blog-popup',
  standalone: true,
  imports: [
    CommonModule,
    NzIconModule,
    BlogDetailComponent,
    NzDropDownModule,
    CreateBlogComponent,
  ],
  templateUrl: './blog-popup.component.html',
  styleUrl: './blog-popup.component.scss',
})
export class BlogPopupComponent implements OnInit {
  @Input() article: any;
  @Output() close = new EventEmitter<void>();
  @Input() isProfile: boolean = false;

  AuthorImage = '/sample-logo.jpg';
  ContentImage = '/asset/temp/kda-gg.jpg';

  liked: boolean = false;
  disliked: boolean = false;
  isBookmarked: boolean = false;
  isVisible: boolean = false;

  onLike() {
    this.liked = !this.liked;
    if (this.disliked) {
      this.disliked = false;
    }
  }
  onDislike() {
    this.disliked = !this.disliked;
    if (this.liked) {
      this.liked = false;
    }
  }
  onBookMark() {
    this.isBookmarked = !this.isBookmarked;
  }
  sanitizedContent!: SafeHtml;

  constructor(
    private sanitizer: DomSanitizer,
    private msg: NzMessageService,
    private store: Store,
  ) {}
  ngOnInit() {
    this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(
      this.article.content,
    );
  }

  onClose() {
    this.close.emit();
  }

  copyToClipboard() {
    const url = `${window.location.href}/${this.article.id}`;
    navigator.clipboard.writeText(url).then(
      () => {
        this.msg.success('Link copied');
      },
      (err) => {
        this.msg.error('Failed to copy link');
      },
    );
  }

  closePopup() {
    this.isVisible = false;
  }

  onEdit() {
    this.isVisible = true;
  }
  onDelete() {
    this.store.dispatch(
      new BlogAction.DeleteBlog(this.article.id, this.article.user.id),
    );
    this.isVisible = false;
  }
}
