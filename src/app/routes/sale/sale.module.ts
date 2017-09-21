import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefundControlComponent } from './refund-control/refund-control.component';
import { RefundVerifyComponent } from './refund-verify/refund-verify.component';
import { ReturnControlComponent } from './return-control/return-control.component';
import { ReturnVerifyComponent } from './return-verify/return-verify.component';
import { MsgComponent } from './msg/msg.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import { RefundDetailsComponent } from './refund-details/refund-details.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { AddproblemComponent } from './addproblem/addproblem.component';
const problemcomplem:Routes=[
  {path: 'addproblem', component: AddproblemComponent},
]
const routes: Routes = [
  {path:'',redirectTo:'refund-control'},
  {path: 'refund-control', component: RefundControlComponent},
  {path: 'refund-verify', component: RefundVerifyComponent},
  {path: 'return-control', component:ReturnControlComponent},
  {path: 'return-verify', component: ReturnVerifyComponent},
  {path: 'refund-details', component:RefundDetailsComponent},
  {path: 'order-detail', component:OrderDetailComponent},
  {path: 'msg', component: MsgComponent,children:problemcomplem},

];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [RefundControlComponent, RefundVerifyComponent, ReturnControlComponent, ReturnVerifyComponent, MsgComponent, RefundDetailsComponent, OrderDetailComponent, AddproblemComponent],
  providers: [
    RefundControlComponent, RefundVerifyComponent, ReturnControlComponent, ReturnVerifyComponent, MsgComponent,OrderDetailComponent,AddproblemComponent
  ]
})
export class SaleModule { }
