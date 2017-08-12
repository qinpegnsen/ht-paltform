import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import { PagesComponent } from './pages/pages.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    PagesComponent,
    LoginComponent

  ],
  exports: [
    PagesComponent,
    LoginComponent
  ]
})
export class PagesModule {
}
