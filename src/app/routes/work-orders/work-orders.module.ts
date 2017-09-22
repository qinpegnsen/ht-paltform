import {NgModule} from "@angular/core";
import {WoAssignComponent} from "./wo-assign/wo-assign.component";
import {WoManageComponent} from "./wo-manage/wo-manage.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {WoAllComponent} from "./wo-all/wo-all.component";
import {WoAssignedComponent} from "./wo-assigned/wo-assigned.component";
import {WoMyComponent} from "./wo-my/wo-my.component";
import {WoDealComponent} from "./wo-deal/wo-deal.component";
import {WoFinishedComponent} from "./wo-finished/wo-finished.component";
import {WoAbnormalComponent} from "./wo-abnormal/wo-abnormal.component";
import {WoService} from "./wo.service";


const routes: Routes = [
  {path: '', redirectTo: 'assign'},
  {path: 'assign', component: WoAssignComponent},
  {
    path: 'manage', component: WoManageComponent, children: [
    {path: '', redirectTo: 'wo-all'},
    {path: 'wo-all', component: WoAllComponent},
    {path: 'wo-assign', component: WoAssignComponent},
    {path: 'wo-assigned', component: WoAssignedComponent},
    {path: 'wo-my', component: WoMyComponent},
    {path: 'wo-deal', component: WoDealComponent},
    {path: 'wo-finished', component: WoFinishedComponent},
    {path: 'wo-abnormal', component: WoAbnormalComponent},
  ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
  ],
  declarations: [
    WoAssignComponent,
    WoManageComponent,
    WoAllComponent,
    WoAssignedComponent,
    WoMyComponent,
    WoDealComponent,
    WoFinishedComponent,
    WoAbnormalComponent
  ],
  providers: [WoManageComponent,WoService]
})
export class WorkOrdersModule {
}
