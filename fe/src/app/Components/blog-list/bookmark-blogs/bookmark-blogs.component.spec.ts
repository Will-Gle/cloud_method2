import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkBlogsComponent } from './bookmark-blogs.component';

describe('BookmarkBlogsComponent', () => {
  let component: BookmarkBlogsComponent;
  let fixture: ComponentFixture<BookmarkBlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkBlogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarkBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
