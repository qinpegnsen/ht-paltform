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


// 子路由，用于页面嵌套显示
const appChildRoutesfile: Routes = [
  {path: 'rightpage', component: RightpageComponent}
];
const routes: Routes = [
  {path: '', component: AppIndexOptComponent},
  {path: 'app-index-opt', component: AppIndexOptComponent,children: appChildRoutesfile},
  {path: 'app-index-tpl', component: AppIndexTplComponent,children: appChildRoutesfile},
  {path: 'app-set', component: AppSetComponent}
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
    AppIndexOptComponent
  ],
  declarations: [AppIndexOptComponent, AppIndexTplComponent, RightpageComponent, AppSetComponent]
})
export class AppModule { }
