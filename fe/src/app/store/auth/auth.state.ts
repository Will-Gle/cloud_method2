import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { ApiService } from '../../service/api.service';
import { catchError, EMPTY, map, take, tap } from 'rxjs';
import { AuthAction } from './auth.action';
import { NzMessageService } from 'ng-zorro-antd/message';
import { StateResetAll } from 'ngxs-reset-plugin';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

export interface loginStatus {
  status: boolean;
  message: string;
}
export interface AuthStateModel {
  token: string;
  LoginStatus: loginStatus;
  RegisterStatus: boolean;
}
@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: '',
    LoginStatus: {
      status: false,
      message: '',
    },
    RegisterStatus: false,
  },
})
@Injectable()
export class AuthState {
  constructor(
    private apiService: ApiService,
    private msg: NzMessageService,
    private store: Store,
    private cookieService: CookieService,
    private router: Router,
  ) {}

  @Selector()
  static token({ token }: AuthStateModel): string {
    return token;
  }

  @Selector()
  static LoginStatus({ LoginStatus }: AuthStateModel): loginStatus {
    return LoginStatus;
  }

  @Selector()
  static RegisterStatus({ RegisterStatus }: AuthStateModel): boolean {
    return RegisterStatus;
  }

  @Action(AuthAction.Login)
  Login(ctx: StateContext<AuthStateModel>, action: AuthAction.Login) {
    return this.apiService.auth.Login(action.payload).pipe(
      tap((response: any) => {
        if (response.code === 200) {
          return ctx.dispatch(new AuthAction.LoginSuccess(response));
        }
        return ctx.dispatch(new AuthAction.LoginFailed(response));
      }),
    );
  }

  @Action(AuthAction.LoginSuccess)
  LoginSuccess(
    ctx: StateContext<AuthStateModel>,
    action: AuthAction.LoginSuccess,
  ) {
    const token = action.payload.result;
    ctx.patchState({
      token: token,
      LoginStatus: { status: true, message: '' },
    });
    this.apiService.auth.setToken(token);
  }

  @Action(AuthAction.LoginFailed)
  LoginFailed(
    ctx: StateContext<AuthStateModel>,
    action: AuthAction.LoginFailed,
  ) {
    ctx.patchState({
      LoginStatus: { status: false, message: action.payload.message },
    });
  }

  @Action(AuthAction.Register)
  Register(ctx: StateContext<AuthStateModel>, action: AuthAction.Register) {
    return this.apiService.auth.Register(action.payload).pipe(
      tap((response: any) => {
        if (response.code === 200) {
          return ctx.dispatch(new AuthAction.RegisterSuccess(response));
        }
        return ctx.dispatch(new AuthAction.RegisterFailed(response));
      }),
    );
  }

  @Action(AuthAction.RegisterSuccess)
  RegisterSuccess(
    ctx: StateContext<AuthStateModel>,
    action: AuthAction.RegisterSuccess,
  ) {
    ctx.patchState({ RegisterStatus: true });
    ctx.patchState({ RegisterStatus: false });
  }
  @Action(AuthAction.RegisterFailed)
  RegisterFailed(
    ctx: StateContext<AuthStateModel>,
    action: AuthAction.RegisterFailed,
  ) {
    this.msg.error(action.payload.message);
  }

  @Action(AuthAction.Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    return this.apiService.auth.Logout().pipe(
      tap((res) => {
        ctx.patchState({
          token: '',
          LoginStatus: { status: false, message: '' },
        });
        this.cookieService.delete('authToken', '/');
        this.store.dispatch(new StateResetAll());
        localStorage.clear();
        this.router.navigate(['/auth']);
      }),
    );
  }
  @Action(AuthAction.RefreshToken)
  RefreshToken(
    ctx: StateContext<AuthStateModel>,
    action: AuthAction.RefreshToken,
  ) {
    return this.apiService.auth.RefreshToken().pipe(
      take(1),
      tap((res) => {
        if (res.code == 200) {
          ctx.dispatch(new AuthAction.RefreshTokenSuccess(res));
        } else {
          ctx.dispatch(new AuthAction.Logout());
          throw Error('Invalid token');
        }
      }),
    );
  }

  @Action(AuthAction.RefreshTokenSuccess)
  refreshTokenSuccess(
    ctx: StateContext<AuthStateModel>,
    { payload }: AuthAction.RefreshTokenSuccess,
  ) {
    const token = payload.result;
    this.apiService.auth.setToken(token);
    ctx.patchState({
      token: token,
      LoginStatus: { status: true, message: '' },
    });
  }
}
