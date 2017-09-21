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
    {path: '', redirectTo: 'wo-all'},
    {path: 'wo-all', component: WoAllComponent},
    {path: 'wo-assign', component: WoAssignComponent},
    {path: 'wo-assigned', component: WoAssignedComponent},
    {path: 'wo-my', component: WoMyComponent},
    {path: 'wo-disposed', component: WoDisposedComponent},
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
    WoDisposedComponent,
    WoFinishedComponent,
    WoAbnormalComponent
  ],
  providers: [WoManageComponent]
})
export class WorkOrdersModule {
}
