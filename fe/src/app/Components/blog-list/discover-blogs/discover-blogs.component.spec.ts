import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverBlogsComponent } from './discover-blogs.component';

describe('DiscoverBlogsComponent', () => {
  let component: DiscoverBlogsComponent;
  let fixture: ComponentFixture<DiscoverBlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscoverBlogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscoverBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
