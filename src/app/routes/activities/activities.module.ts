import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SiteComponent} from "./site/site.component";
import {StaticsComponent} from "./statics/statics.component";
import {RpPondComponent} from "./rp-pond/rp-pond.component";
import {RecordComponent} from "./record/record.component";
import {AddRedPackageComponent} from "./add-red-package/add-red-package.component";
import {RpStoreComponent} from "./rp-store/rp-store.component";
import {StoreRightPageComponent} from "./store-right-page/store-right-page.component";
import {SharedModule} from "../../shared/shared.module";
import {FileUploadModule} from "ng2-file-upload";
import {ActivitiesService} from "./activities.service";
import {StoreInvestComponent} from "./store-invest/store-invest.component";
import { AuditComponent } from './audit/audit.component';
import { AuditAlertComponent } from './audit-alert/audit-alert.component';

const storeRoutes: Routes = [
  {path: 'storePage', component: StoreRightPageComponent},
];
const addRedPackage: Routes = [
  {path: 'addRedPack', component: AddRedPackageComponent}
];
const redPacketRoutes: Routes = [
  {path: '', redirectTo: 'site',pathMatch:'full'},
  {path: 'site', component: SiteComponent,children:addRedPackage},
  {path: 'statics', component: StaticsComponent},
  {path: 'pond', component: RpPondComponent},
  {path: 'record', component: RecordComponent},
  {path: 'audit', component: AuditComponent},
  {path: 'store', component: RpStoreComponent,children:storeRoutes}
]
const routes: Routes = [
  {path: '', redirectTo: 'redPacket',pathMatch:'full'},
  {path: 'redPacket',children:redPacketRoutes},
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FileUploadModule
  ],
  declarations: [SiteComponent, StaticsComponent, RecordComponent, AddRedPackageComponent, RpPondComponent, RpStoreComponent, StoreRightPageComponent,StoreInvestComponent, AuditComponent, AuditAlertComponent],
  providers:[ActivitiesService]
})
export class ActivitiesModule { }
