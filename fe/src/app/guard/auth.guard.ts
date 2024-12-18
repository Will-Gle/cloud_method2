import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../service/api.service';
import { UserState } from '../store/user/user.state';

export const authGuard = () => {
  const router = inject(Router);
  const token = inject(ApiService).auth.getToken();

  if (!token) {
    router.navigate(['/auth']);
  }
  return !!token;
};

export const unAuthGuard = () => {
  const router = inject(Router);
  const token = inject(ApiService).auth.getToken();

  if (!!token) {
    router.navigate(['/']);
  }

  return !token;
};

export const adminGuard = () => {
  const store = inject(Store);
  const userRole = store.selectSnapshot(UserState.currentRole).name;

  if (userRole !== 'admin') {
    inject(Router).navigate(['/']);
  }

  return userRole === 'admin';
};
