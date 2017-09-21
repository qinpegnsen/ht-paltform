import {NgModule} from "@angular/core";
import {WoAssignComponent} from "./wo-assign/wo-assign.component";
import {WoManageComponent} from "./wo-manage/wo-manage.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {WoAllComponent} from "./wo-all/wo-all.component";
import {WoAssignedComponent} from "./wo-assigned/wo-assigned.component";
import {WoMyComponent} from "./wo-my/wo-my.component";
import {WoDisposedComponent} from "./wo-disposed/wo-disposed.component";
import {WoFinishedComponent} from "./wo-finished/wo-finished.component";
import {WoAbnormalComponent} from "./wo-abnormal/wo-abnormal.component";


const routes: Routes = [
  {path: '', redirectTo: 'assign'},
  {path: 'assign', component: WoAssignComponent},
  {
    path: 'manage', component: WoManageComponent, children: [
    {path: '', redirectTo: 'all'},
    {path: 'all', component: WoAllComponent},
    {path: 'assign', component: WoAssignComponent},
    {path: 'assigned', component: WoAssignedComponent},
    {path: 'my', component: WoMyComponent},
    {path: 'disposed', component: WoDisposedComponent},
    {path: 'finished', component: WoFinishedComponent},
    {path: 'abnormal', component: WoAbnormalComponent},
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
    WoDisposedComponent,
    WoFinishedComponent,
    WoAbnormalComponent
  ],
  providers: [WoManageComponent]
})
export class WorkOrdersModule {
}
