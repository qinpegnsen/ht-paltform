import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StorePendingComponent} from './store-pending/store-pending.component';
import {StoreCancelComponent} from './store-cancel/store-cancel.component';
import {StoreReceivedComponent} from './store-received/store-received.component';
import {StoreCompleteComponent} from './store-complete/store-complete.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {FileUploadModule} from 'ng2-file-upload';
import {StoreOrderService} from './store-order.service';
import {OrderDetailComponent} from './order-detail/order-detail.component';

const routes: Routes = [
  {path: '', redirectTo: 'store-pending'},
  {path: 'store-pending', component: StorePendingComponent,children: [
    {path: 'order-detail', component: OrderDetailComponent}
  ]},//待发货
  {path: 'store-received', component: StoreReceivedComponent,children: [
    {path: 'order-detail', component: OrderDetailComponent}
  ]},//待收货
  {path: 'store-complete', component: StoreCompleteComponent,children: [
    {path: 'order-detail', component: OrderDetailComponent}
  ]},//已完成
  {path: 'store-cancel', component: StoreCancelComponent,children: [
    {path: 'order-detail', component: OrderDetailComponent}
  ]},//已取消
]


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FileUploadModule
  ],
  declarations: [StorePendingComponent, StoreCancelComponent, StoreReceivedComponent, StoreCompleteComponent,OrderDetailComponent],
  providers: [
    StoreOrderService
  ]
})
export class StoreOrderModule { }
