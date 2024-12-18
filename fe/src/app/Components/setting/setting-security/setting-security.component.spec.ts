import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingSecurityComponent } from './setting-security.component';

describe('SettingSecurityComponent', () => {
  let component: SettingSecurityComponent;
  let fixture: ComponentFixture<SettingSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingSecurityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
