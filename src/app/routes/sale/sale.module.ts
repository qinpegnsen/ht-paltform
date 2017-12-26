import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RefundControlComponent} from './refund-control/refund-control.component';
import {RefundVerifyComponent} from './refund-verify/refund-verify.component';
import {ReturnControlComponent} from './return-control/return-control.component';
import {ReturnVerifyComponent} from './return-verify/return-verify.component';
import {MsgComponent} from './msg/msg.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {AfterDetailsComponent} from './after-details/after-details.component';
import {AddproblemComponent} from './addproblem/addproblem.component';
import {AfterService} from "./after.service";
import {InspectGoodsComponent} from './inspect-goods/inspect-goods.component';
import {OrderDetailComponent} from "./order-detail/order-detail.component";
import {OrdersService} from "../orders/orders/orders.service";
import {StoreRefundComponent} from "./store-refund/store-refund.component";
import {StoreReturnComponent} from "./store-return/store-return.component";
const problemcomplem: Routes = [
  {path: 'addproblem', component: AddproblemComponent},
]
const routes: Routes = [
  {path: '', redirectTo: 'refund-control'},
  {path: 'enterprise', children: [
    {path: '',redirectTo: 'storeRefundMan'},
    {path: 'storeRefundMan', component: StoreRefundComponent, children: [
      {path: 'after-details', component: AfterDetailsComponent},
      {path: 'order-details', component: OrderDetailComponent}
    ]},
    {path: 'storeReturnMan', component: StoreReturnComponent, children: [
      {path: 'after-details', component: AfterDetailsComponent},
      {path: 'order-details', component: OrderDetailComponent}
    ]}
  ]},
  {path: 'refund-control', component: RefundControlComponent, children: [
    {path: 'after-details', component: AfterDetailsComponent},
    {path: 'order-details', component: OrderDetailComponent}
  ]},
  // {path: 'refund-verify', component: RefundVerifyComponent, children: [
  //   {path: 'after-details', component: AfterDetailsComponent},
  //   {path: 'order-details', component: OrderDetailComponent}
  // ]},
  {path: 'return-control', component: ReturnControlComponent, children: [
    {path: 'after-details', component: AfterDetailsComponent},
    {path: 'order-details', component: OrderDetailComponent}
  ]},
  // {path: 'return-verify', component: ReturnVerifyComponent, children: [
  //   {path: 'after-details', component: AfterDetailsComponent},
  //   {path: 'order-details', component: OrderDetailComponent}
  // ]},
  // {path: 'inspect-goods', component: InspectGoodsComponent, children: [
  //   {path: 'after-details', component: AfterDetailsComponent},
  //   {path: 'order-details', component: OrderDetailComponent}
  // ]},
  {path: 'msg', component: MsgComponent, children: problemcomplem},

];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    RefundControlComponent,
    RefundVerifyComponent,
    ReturnControlComponent,
    ReturnVerifyComponent,
    MsgComponent,
    AfterDetailsComponent,
    OrderDetailComponent,
    AddproblemComponent,
    InspectGoodsComponent,
    StoreRefundComponent,
    StoreReturnComponent],
  providers: [
    RefundControlComponent,
    RefundVerifyComponent,
    ReturnControlComponent,
    ReturnVerifyComponent,
    MsgComponent,
    AddproblemComponent,
    AfterService,
    OrdersService
  ]
})
export class SaleModule {
}
