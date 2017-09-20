import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentpersonComponent } from './agentperson/agentperson.component';
import { RegionComponent } from './region/region.component';
import { StockComponent } from './stock/stock.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import { RightpageComponent } from './rightpage/rightpage.component';
import { AddAgentComponent } from './add-agent/add-agent.component';
import {AgentpersonService} from "./agentperson/agentperson.service";
import {FileUploader} from "ng2-file-upload/index";
import {FileUploadModule} from "ng2-file-upload/index";
import { AllStockComponent } from './stock/all-stock/all-stock.component';
import { PendingPaymentComponent } from './stock/pending-payment/pending-payment.component';
import { ForDistributionComponent } from './stock/for-distribution/for-distribution.component';
import { AwaitingDeliveryComponent } from './stock/awaiting-delivery/awaiting-delivery.component';
import { CompleteComponent } from './stock/complete/complete.component';
import { CancelComponent } from './stock/cancel/cancel.component';

// 子路由，用于页面嵌套显示
const appChildRoutesfile: Routes = [
  {path: 'rightpage', component: RightpageComponent}
];
// 子路由，用于页面嵌套显示
const appChildRoutes: Routes = [
  {path: 'rightpage', component: RightpageComponent},
  {path: 'appAgent', component: AddAgentComponent,children: appChildRoutesfile}
];
const routes: Routes = [
  {path: '', redirectTo:'agentperson'},
  {path: 'agentperson', component: AgentpersonComponent,children: appChildRoutes},
  {path: 'region', component: RegionComponent,children: appChildRoutes},
  {path: 'stock', component:StockComponent,children:[
    {path: '', redirectTo: 'all-stock'},
    {path: 'all-stock', component: AllStockComponent},
    {path: 'pending-payment', component: PendingPaymentComponent},
    {path: 'for-distribution', component: ForDistributionComponent},
    {path: 'awaiting-delivery', component: AwaitingDeliveryComponent},
    {path: 'complete', component: CompleteComponent},
    {path: 'cancel', component: CancelComponent}
  ]}
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FileUploadModule
  ],
  providers:[AgentpersonService,RegionComponent],
  declarations: [AgentpersonComponent, RegionComponent, StockComponent, RightpageComponent, AddAgentComponent, AllStockComponent, PendingPaymentComponent, ForDistributionComponent, AwaitingDeliveryComponent, CompleteComponent, CancelComponent]
})
export class AgentModule { }
