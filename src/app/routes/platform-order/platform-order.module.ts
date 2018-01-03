import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlatformCancelComponent} from './platform-cancel/platform-cancel.component';
import {PlatformCompleteComponent} from './platform-complete/platform-complete.component';
import {PlatformPendingComponent} from './platform-pending/platform-pending.component';
import {PlatformReceivedComponent} from './platform-received/platform-received.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {FileUploadModule} from 'ng2-file-upload';
import {PlatformOrderService} from './platform-order.service';
import {OrderDetailComponent} from './order-detail/order-detail.component';
import {DeliverComponent} from './deliver/deliver.component';
import {PlatformPaymentComponent} from './platform-payment/platform-payment.component';



const routes: Routes = [
  {path: '', redirectTo: 'platform-pending'},
  {path: 'platform-payment', component: PlatformPaymentComponent,children: [
    {path: 'order-detail', component: OrderDetailComponent}
  ]},//待付款
  {path: 'platform-pending', component: PlatformPendingComponent,children: [
    {path: 'order-detail', component: OrderDetailComponent}
  ]},//待发货
  {path: 'platform-received', component: PlatformReceivedComponent,children: [
    {path: 'order-detail', component: OrderDetailComponent}
  ]},//待收货
  {path: 'platform-complete', component: PlatformCompleteComponent,children: [
    {path: 'order-detail', component: OrderDetailComponent}
  ]},//已取消
  {path: 'platform-cancel', component: PlatformCancelComponent,children: [
    {path: 'order-detail', component: OrderDetailComponent}
  ]},//已完成
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FileUploadModule
  ],
  declarations: [PlatformCancelComponent, PlatformCompleteComponent, PlatformPendingComponent, PlatformReceivedComponent,OrderDetailComponent, DeliverComponent, PlatformPaymentComponent],
  providers: [
    PlatformOrderService
  ]
})
export class PlatformOrderModule { }
