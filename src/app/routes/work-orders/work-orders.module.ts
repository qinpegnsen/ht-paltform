import {NgModule} from "@angular/core";
import {WoManageComponent} from "./wo-manage/wo-manage.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {WoAllComponent} from "./wo-all/wo-all.component";
import {WoService} from "./wo.service";
import { AssignToAgentComponent } from './assign-to-agent/assign-to-agent.component';
import {OrderDetailComponent} from "./order-detail/order-detail.component";
import {OrdersService} from "../orders/orders/orders.service";


const routes: Routes = [
  {path: '', redirectTo: 'assign'},
  {path: 'assign', component: WoAllComponent},
  {
    path: 'manage', component: WoManageComponent, children: [
    {path: '', redirectTo: 'wo-all'},
    {path: 'wo-all', component: WoAllComponent},
    {path: 'wo-assign', component: WoAllComponent},
    {path: 'wo-assigned', component: WoAllComponent},
    {path: 'wo-my', component: WoAllComponent},
    {path: 'wo-deal', component: WoAllComponent},
    {path: 'wo-finished', component: WoAllComponent},
    {path: 'wo-abnormal', component: WoAllComponent},
    {path: 'order-detail', component: OrderDetailComponent},
  ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
  ],
  declarations: [
    WoManageComponent,
    WoAllComponent,
    AssignToAgentComponent,
    OrderDetailComponent
  ],
  providers: [WoManageComponent,WoService,OrdersService]
})
export class WorkOrdersModule {
}
