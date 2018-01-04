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
import {StorePaymentComponent} from './store-payment/store-payment.component';
import {StoreAllComponent} from './store-all/store-all.component';

const routes: Routes = [
  {path: '', redirectTo: 'store-all'},
  {path: 'store-all', component: StoreAllComponent,children: [
    {path: 'order-detail', component: OrderDetailComponent}
  ]},//全部订单
  {path: 'store-payment', component: StorePaymentComponent,children: [
    {path: 'order-detail', component: OrderDetailComponent}
  ]},//待付款
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
  declarations: [StorePendingComponent, StoreCancelComponent, StoreReceivedComponent, StoreCompleteComponent,OrderDetailComponent, StorePaymentComponent, StoreAllComponent],
  providers: [
    StoreOrderService
  ]
})
export class StoreOrderModule { }
