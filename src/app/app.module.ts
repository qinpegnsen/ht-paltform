import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'; // this is needed!
import {NgModule} from '@angular/core';
import {HttpModule, Http} from '@angular/http';
import {TranslateService, TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {AppComponent} from './app.component';

import {CoreModule} from './core/core.module';
import {LayoutModule} from './layout/layout.module';
import {SharedModule} from './shared/shared.module';
import {RoutesModule} from './routes/routes.module';
import {CookieService} from '_angular2-cookie@1.2.6@angular2-cookie';
import { OpaqueToken } from '@angular/core';

// https://github.com/ocombe/ng2-translate/issues/218
export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpModule, // http 请求
    BrowserAnimationsModule, // required for ng2-tag-input
    CoreModule, // 核心模块，该模块注入了项目必须的服务
    LayoutModule, // 框架组成：头、左侧栏、底
    SharedModule.forRoot(), // 公用模块
    RoutesModule, // 路由模块
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
