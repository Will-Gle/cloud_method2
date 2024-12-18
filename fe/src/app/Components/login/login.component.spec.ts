import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { EyeInvisibleOutline } from '@ant-design/icons-angular/icons';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        LoginComponent,
        NzIconModule.forRoot([EyeInvisibleOutline])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a "Sign In" button', () => {
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('button[type="submit"]');
    expect(button).toBeTruthy();
    expect(button.textContent).toContain('Sign In');
  });

  // Add more tests as needed
});
