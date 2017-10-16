import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppIndexOptComponent } from './app-index-opt/app-index-opt.component';
import { AppIndexTplComponent } from './app-index-tpl/app-index-tpl.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {AppIndexOptService} from './app-index-opt/app-index-opt.service';
import {AppIndexTplService} from './app-index-tpl/app-index-tpl.service';
import { RightpageComponent } from './rightpage/rightpage.component';
import { AppSetComponent } from './app-set/app-set.component';
import {FileUploadModule} from 'ng2-file-upload';
import {LogisticsComponent} from './logistics/logistics.component';
import {AppSetService} from './app-set/app-set.service';
import {SysNoticeComponent} from "./sys-notice/sys-notice.component";
import {AddNoticeComponent} from "./sys-notice/add-notice/add-notice.component";
import {OperationService} from "../operation/operation.service";


// 子路由，用于页面嵌套显示
const appChildRoutesfile: Routes = [
  {path: 'rightpage', component: RightpageComponent}
];
const addNotice: Routes = [
  {path: 'addNotice', component: AddNoticeComponent}
];
const routes: Routes = [
  {path: '', component: AppIndexOptComponent},
  {path: 'app-index-opt', component: AppIndexOptComponent,children: appChildRoutesfile},
  {path: 'app-index-tpl', component: AppIndexTplComponent,children: appChildRoutesfile},
  {path: 'app-set', component: AppSetComponent},
  {path: 'sys-notice', component: SysNoticeComponent,children: addNotice},
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FileUploadModule
  ],
  providers: [
    AppIndexOptService,
    AppIndexTplService,
    AppIndexOptComponent,
    AppIndexTplComponent,
    AppSetService,
    OperationService
  ],
  declarations: [AppIndexOptComponent, AddNoticeComponent,AppIndexTplComponent, RightpageComponent, AppSetComponent,LogisticsComponent,SysNoticeComponent]
})
export class AppModule { }
