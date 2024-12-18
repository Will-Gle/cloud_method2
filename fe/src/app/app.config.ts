import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { icons } from './icons-provider';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgxsModule, provideStore } from '@ngxs/store';
import { errorInterceptor } from './interceptors/error.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NgxsResetPlugin } from 'ngxs-reset-plugin';
import { AuthState } from './store/auth/auth.state';
import { UserState } from './store/user/user.state';
import { BlogState } from './store/blog/blog.state';
import { TagsState } from './store/tags/tags.state';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNzIcons(icons),
    provideNzI18n(en_US),
    importProvidersFrom(
      NgxsModule.forRoot([AuthState, UserState, BlogState, TagsState], {
        developmentMode: false,
        selectorOptions: {
          injectContainerState: false,
        },
      }),
      // NgxsResetPlugin.forRoot(),
      NgxsReduxDevtoolsPluginModule.forRoot({
        disabled: false,
      }),
    ),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([AuthInterceptor, errorInterceptor],)),
    provideStore([]),
  ],
};
