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
  {path: 'stock', component:StockComponent}
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FileUploadModule
  ],
  providers:[AgentpersonService,RegionComponent],
  declarations: [AgentpersonComponent, RegionComponent, StockComponent, RightpageComponent, AddAgentComponent]
})
export class AgentModule { }
