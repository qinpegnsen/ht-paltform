import {NgModule} from "@angular/core";
import {WoManageComponent} from "./wo-manage/wo-manage.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {WoAllComponent} from "./wo-all/wo-all.component";
import {WoService} from "./wo.service";


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
  ],
  providers: [WoManageComponent,WoService]
})
export class WorkOrdersModule {
}
