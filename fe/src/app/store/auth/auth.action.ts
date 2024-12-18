export enum Actions {
  LOGIN = '[Auth] login',
  LOGIN_SUCCESS = '[Auth] login successfully',
  LOGIN_FAILED = '[Auth] login failed',
  REGISTER = '[Auth] register',
  REGISTER_SUCCESS = '[Auth] register successfully',
  REGISTER_FAILED = '[Auth] register failed',
  LOGOUT = '[Auth] logout',
  REFRESH_TOKEN = '[Auth] refresh token',
  REFRESH_TOKEN_SUCCESS = '[Auth] refresh token successfully',
  REFRESH_TOKEN_FAILED = '[Auth] refresh token failed',
}
export namespace AuthAction {
  export class Login {
    static type = Actions.LOGIN;
    constructor(public payload: any) {}
  }
  export class LoginSuccess {
    static type = Actions.LOGIN_SUCCESS;
    constructor(public payload: any) {}
  }
  export class LoginFailed {
    static type = Actions.LOGIN_FAILED;
    constructor(public payload: any) {}
  }
  export class Register {
    static type = Actions.REGISTER;
    constructor(public payload: any) {}
  }
  export class RegisterSuccess {
    static type = Actions.REGISTER_SUCCESS;
    constructor(public payload: any) {}
  }
  export class RegisterFailed {
    static type = Actions.REGISTER_FAILED;
    constructor(public payload: any) {}
  }

  export class Logout {
    static type = Actions.LOGOUT;
  }

  export class RefreshToken {
    static type = Actions.REFRESH_TOKEN;
  }

  export class RefreshTokenSuccess {
    static type = Actions.REFRESH_TOKEN_SUCCESS;
    constructor(public payload: any) {}
  }
}
