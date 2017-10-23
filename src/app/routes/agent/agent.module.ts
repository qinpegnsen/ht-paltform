import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentpersonComponent } from './agentperson/agentperson.component';
import { RegionComponent } from './region/region.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import { RightpageComponent } from './rightpage/rightpage.component';
import { AddAgentComponent } from './add-agent/add-agent.component';
import {AgentpersonService} from "./agentperson/agentperson.service";
import {FileUploader} from "ng2-file-upload/index";
import {FileUploadModule} from "ng2-file-upload/index";
import { DepositAuditComponent } from './deposit-audit/deposit-audit.component';
import { DepositRecordComponent } from './deposit-record/deposit-record.component';
import { AddRecordComponent } from './add-record/add-record.component';

// 子路由，用于页面嵌套显示
const appChildRoutesfile: Routes = [
  {path: 'rightpage', component: RightpageComponent}
];
// 子路由，用于页面嵌套显示
const appChildRoutes: Routes = [
  {path: '', component: AgentpersonComponent,children:[
    {path: 'rightpage', component: RightpageComponent},
  ]},
  {path: 'appAgent', component: AddAgentComponent,children: appChildRoutesfile}
];
const routes: Routes = [
  {path: '', redirectTo:'agentperson'},
  {path: 'agentperson', children: appChildRoutes},
  {path: 'region', component: RegionComponent,children: appChildRoutes},
  {path: 'deposit-audit', component: DepositAuditComponent},
  {path: 'deposit-record', component: DepositRecordComponent},
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FileUploadModule
  ],
  providers:[AgentpersonService,RegionComponent],
  declarations: [AgentpersonComponent, RegionComponent, RightpageComponent, AddAgentComponent, DepositAuditComponent, DepositRecordComponent, AddRecordComponent]
})
export class AgentModule { }
