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
const problemcomplem: Routes = [
  {path: 'addproblem', component: AddproblemComponent},
]
const routes: Routes = [
  {path: '', redirectTo: 'refund-control'},
  {path: 'refund-control', component: RefundControlComponent},
  {path: 'refund-verify', component: RefundVerifyComponent},
  {path: 'return-control', component: ReturnControlComponent},
  {path: 'return-verify', component: ReturnVerifyComponent},
  {path: 'after-details', component: AfterDetailsComponent},
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
    AddproblemComponent],
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
