import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StorePendingComponent} from './store-pending/store-pending.component';
import {StoreCancelComponent} from './store-cancel/store-cancel.component';
import {StoreReceivedComponent} from './store-received/store-received.component';
import {StoreCompleteComponent} from './store-complete/store-complete.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {FileUploadModule} from 'ng2-file-upload';

const routes: Routes = [
  {path: '', redirectTo: 'store-pending'},
  {path: 'store-pending', component: StorePendingComponent},//待发货
  {path: 'store-received', component: StoreReceivedComponent},//待收货
  {path: 'store-complete', component: StoreCompleteComponent},//已取消
  {path: 'store-cancel', component: StoreCancelComponent},//已完成
]


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FileUploadModule
  ],
  declarations: [StorePendingComponent, StoreCancelComponent, StoreReceivedComponent, StoreCompleteComponent]
})
export class StoreOrderModule { }
