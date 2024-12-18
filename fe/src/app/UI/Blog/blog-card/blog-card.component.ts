import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { BlogPopupComponent } from '../blog-popup/blog-popup.component';
import Iconify from '@iconify/tailwind';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { DateFormatter } from '../../../utils/formatDate';
import { User } from '../../../store/user/user.state';
import { Tags } from '../../../store/tags/tags.state';
import { BlogAction } from '../../../store/blog/blog.action';
import { Store } from '@ngxs/store';
@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [CommonModule, NzIconModule, BlogPopupComponent, NzToolTipModule],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.scss',
  providers: [DateFormatter],
})
export class BlogCardComponent implements OnInit {
  @Input() article: any;
  @Input() userId: string | null = null;
  @Input() userName: string | null = null;
  @Input() isProfile: boolean = false;
  UserName: string = '';
  UserID: string = '';
  date: string = '';
  tags: Tags[] = [];
  isPopupVisible: boolean = false;
  isBookmarked: boolean = false;
  upvotes: number = 0;
  downvotes: number = 0;

  constructor(
    private formatDate: DateFormatter,
    private store: Store,
  ) {}
  ngOnInit(): void {
    this.date = this.formatDate.convertDate(this.article.createdAt);
    if (this.userId && this.userName) {
      this.UserName = this.userName;
      this.UserID = this.userId;
    } else {
      this.UserName = this.article.user.username;
      this.UserID = this.article.user.id;
    }
    this.tags = this.article.tags;
    this.upvotes = this.article.votes.upVote;
    this.downvotes = this.article.votes.downVote;
  }

  get cardBackground(): string {
    return 'url("/asset/blog-card/default.png")';
  }

  openPopup() {
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
    this.store.dispatch(new BlogAction.GetBlogs());
  }
}
