import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Router, RouterModule } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngxs/store';
import { AuthAction } from '../../store/auth/auth.action';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AuthState, loginStatus } from '../../store/auth/auth.state';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';
import { User, UserState } from '../../store/user/user.state';
import { UserAction } from '../../store/user/user.action';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NzIconModule,
    RouterModule,
    NzFormModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  imagePath = '/sample-bg.png';
  loginForm: FormGroup;
  user$: Observable<User>;
  status$: Observable<loginStatus>;
  private destroy$ = new Subject<void>();

  constructor(
    private _fb: FormBuilder,
    private _store: Store,
    private _router: Router,
    private _msg: NzMessageService,
  ) {
    this.loginForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.user$ = this._store.select(UserState.userProfile);
    this.status$ = this._store.select(AuthState.LoginStatus);
    this.status$.pipe(takeUntil(this.destroy$)).subscribe((response) => {
      if (response.status === true && response.message !== 'Unauthenticated') {
        this._msg.success('Login successfully');
        this._router.navigate(['/']);
        this._store.dispatch(new UserAction.getMe());
      } else if (response.message !== '') {
        this._msg.error(response.message);
      }
    });
  }

  onLogin() {
    const payload = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
    };
    if (payload) {
      this._store.dispatch(
        new AuthAction.Login({
          username: payload.username,
          password: payload.password,
        }),
      );
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
