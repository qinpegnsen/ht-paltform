import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RefundControlComponent} from './refund-control/refund-control.component';
import {ReturnControlComponent} from './return-control/return-control.component';
import {MsgComponent} from './msg/msg.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {AfterDetailsComponent} from './after-details/after-details.component';
import {AddproblemComponent} from './addproblem/addproblem.component';
import {AfterService} from "./after.service";
import {OrdersService} from "../orders/orders/orders.service";
import {StoreRefundComponent} from "./store-refund/store-refund.component";
import {StoreReturnComponent} from "./store-return/store-return.component";
const problemcomplem: Routes = [
  {path: 'addproblem', component: AddproblemComponent},
]
const routes: Routes = [
  {path: '', redirectTo: 'refund-control'},
  {path: 'enterprise', children: [
    {path: 'storeRefundMan', component: StoreRefundComponent, children: [
      {path: 'after-details', component: AfterDetailsComponent},
    ]},
    {path: 'storeReturnMan', component: StoreReturnComponent, children: [
      {path: 'after-details', component: AfterDetailsComponent},
    ]}
  ]},
  {path: 'refund-control', component: RefundControlComponent, children: [
    {path: 'after-details', component: AfterDetailsComponent},
  ]},
  {path: 'return-control', component: ReturnControlComponent, children: [
    {path: 'after-details', component: AfterDetailsComponent},
  ]},
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
    ReturnControlComponent,
    MsgComponent,
    AfterDetailsComponent,
    AddproblemComponent,
    StoreRefundComponent,
    StoreReturnComponent],
  providers: [
    RefundControlComponent,
    ReturnControlComponent,
    MsgComponent,
    AddproblemComponent,
    AfterService,
    OrdersService
  ]
})
export class SaleModule {
}
