import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportBlogComponent } from './report-blog.component';

describe('ReportBlogComponent', () => {
  let component: ReportBlogComponent;
  let fixture: ComponentFixture<ReportBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportBlogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
