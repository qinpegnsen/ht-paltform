import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlatformCancelComponent} from './platform-cancel/platform-cancel.component';
import {PlatformCompleteComponent} from './platform-complete/platform-complete.component';
import {PlatformPendingComponent} from './platform-pending/platform-pending.component';
import {PlatformReceivedComponent} from './platform-received/platform-received.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {FileUploadModule} from 'ng2-file-upload';


const routes: Routes = [
  {path: '', redirectTo: 'platform-pending'},
  {path: 'platform-pending', component: PlatformPendingComponent},//待发货
  {path: 'platform-received', component: PlatformReceivedComponent},//待收货
  {path: 'platform-complete', component: PlatformCompleteComponent},//已取消
  {path: 'platform-cancel', component: PlatformCancelComponent},//已完成
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FileUploadModule
  ],
  declarations: [PlatformCancelComponent, PlatformCompleteComponent, PlatformPendingComponent, PlatformReceivedComponent]
})
export class PlatformOrderModule { }
