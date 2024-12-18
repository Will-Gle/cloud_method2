import { HttpInterceptorFn } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { inject, Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {
  HttpErrorResponse,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AuthAction } from '../store/auth/auth.action';

// Add this flag outside the interceptor to maintain state
let isRefreshing = false;

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<any>> => {
  const messageService = inject(NzMessageService);
  const store = inject(Store);

  return next(req).pipe(
    map((event: HttpEvent<any>): HttpEvent<any> => {
      if (event instanceof HttpResponse) {
        const body = event.body;
        if (body && body.code === 9999) {
          const errorMessage = body.message || 'Unknown error occurred';
          messageService.error(errorMessage);
        } else if(body && body.code === 401 && !isRefreshing) {
          isRefreshing = true;
          store.dispatch(new AuthAction.RefreshToken()).subscribe({
            complete: () => {
              isRefreshing = false;
            },
            error: () => {
              isRefreshing = false;
            }
          });
        }
      }
      return event;
    }),
    catchError((error: HttpErrorResponse) => {
      let errorMessage = '';

      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Client-side error: ${error.error.message}`;
      } else {
        // Server-side error
        errorMessage = error.error.error || 'Unknown server error occurred';
      }

      messageService.error(errorMessage);
      return throwError(() => errorMessage);
    }),
  );
};
