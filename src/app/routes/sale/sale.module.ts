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
import { InspectGoodsComponent } from './inspect-goods/inspect-goods.component';
const problemcomplem: Routes = [
  {path: 'addproblem', component: AddproblemComponent},
]
const routes: Routes = [
  {path: '', redirectTo: 'refund-control'},
  {path: 'refund-control', children: [
    {path: '', component: RefundControlComponent},
    {path: 'after-details', component: AfterDetailsComponent},
  ]},
  {path: 'refund-verify', children: [
    {path: '', component: RefundVerifyComponent},
    {path: 'after-details', component: AfterDetailsComponent},
  ]},
  {path: 'return-control', children: [
    {path: '', component: ReturnControlComponent},
    {path: 'after-details', component: AfterDetailsComponent},
  ]},
  {path: 'return-verify', children: [
    {path: '', component: ReturnVerifyComponent},
    {path: 'after-details', component: AfterDetailsComponent},
  ]},
  {path: 'inspect-goods', children: [
    {path: '', component: InspectGoodsComponent},
    {path: 'after-details', component: AfterDetailsComponent},
  ]},
  // {path: 'after-details', component: AfterDetailsComponent},
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
    AddproblemComponent,
    InspectGoodsComponent],
  providers: [
    RefundControlComponent,
    RefundVerifyComponent,
    ReturnControlComponent,
    ReturnVerifyComponent,
    MsgComponent,
    AddproblemComponent,
    AfterService
  ]
})
export class SaleModule {
}
