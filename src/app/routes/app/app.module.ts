import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppIndexOptComponent } from './app-index-opt/app-index-opt.component';
import { AppIndexTplComponent } from './app-index-tpl/app-index-tpl.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {AppIndexOptService} from './app-index-opt/app-index-opt.service';
import {AppIndexTplService} from './app-index-tpl/app-index-tpl.service';
import { RightpageComponent } from './rightpage/rightpage.component';


// 子路由，用于页面嵌套显示
const appChildRoutesfile: Routes = [
  {path: 'rightpage', component: RightpageComponent}
];
const routes: Routes = [
  {path: '', component: AppIndexOptComponent},
  {path: 'app-index-opt', component: AppIndexOptComponent,children: appChildRoutesfile},
  {path: 'app-index-tpl', component: AppIndexTplComponent,children: appChildRoutesfile},
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [
    AppIndexOptService,
    AppIndexTplService,
    AppIndexOptComponent
  ],
  declarations: [AppIndexOptComponent, AppIndexTplComponent, RightpageComponent]
})
export class AppModule { }
