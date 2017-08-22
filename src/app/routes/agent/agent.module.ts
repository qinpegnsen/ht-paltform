import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentpersonComponent } from './agentperson/agentperson.component';
import { RegionComponent } from './region/region.component';
import { StockComponent } from './stock/stock.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import { RightpageComponent } from './rightpage/rightpage.component';


// 子路由，用于页面嵌套显示
const appChildRoutes: Routes = [
  {path: 'rightpage', component: RightpageComponent}
];
const routes: Routes = [
  {path: '', component: AgentpersonComponent},
  {path: 'agentperson', component: AgentpersonComponent},
  {path: 'region', component: RegionComponent,children: appChildRoutes},
  {path: 'stock', component:StockComponent},

];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [AgentpersonComponent, RegionComponent, StockComponent, RightpageComponent]
})
export class AgentModule { }
