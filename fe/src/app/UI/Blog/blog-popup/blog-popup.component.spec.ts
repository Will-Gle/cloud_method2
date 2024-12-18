import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPopupComponent } from './blog-popup.component';

describe('BlogPopupComponent', () => {
  let component: BlogPopupComponent;
  let fixture: ComponentFixture<BlogPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
