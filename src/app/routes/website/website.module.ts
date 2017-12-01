import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreasComponent } from './areas/areas.component';
import { DataDictionaryComponent } from './data-dictionary/data-dictionary.component';
import { MeasureComponent } from './measure/measure.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {AdddataComponent} from "./adddata/adddata.component";
import { RightpageComponent } from './rightpage/rightpage.component';
import {DataDictionaryComponentService} from "./data-dictionary/data-dictionary-component.service";
import {MeasureService} from "./measure/measure.service";
import {SiteComponent} from "./site/site.component";
import {StaticsComponent} from "./statics/statics.component";
import {RecordComponent} from "./record/record.component";
import {AddRedPackageComponent} from "./add-red-package/add-red-package.component";
import {WebstiteService} from "./webstite.service";
import { RpPondComponent } from './rp-pond/rp-pond.component';
import { RpStoreComponent } from './rp-store/rp-store.component';
import { StoreRightPageComponent } from './store-right-page/store-right-page.component';
import {FileUploadModule} from "ng2-file-upload";

const storeRoutes: Routes = [
  {path: 'storePage', component: StoreRightPageComponent},
]
const redPacketRoutes: Routes = [
  {path: 'site', component: SiteComponent},
  {path: 'statics', component: StaticsComponent},
  {path: 'pond', component: RpPondComponent},
  {path: 'record', component: RecordComponent},
  {path: 'addRedPack', component: AddRedPackageComponent},
  {path: 'store', component: RpStoreComponent,children:storeRoutes}
]
const appChildRoutes: Routes = [
  {path: 'adddata', component: AdddataComponent},
  {path: 'rightpage', component: RightpageComponent}
]
const routes: Routes = [
  {path:'',redirectTo:'areas'},
  {path: 'areas', component: AreasComponent,children:appChildRoutes},
  {path: 'redPacket',children:redPacketRoutes},
  {path: 'dataDictionary', component:DataDictionaryComponent,children:appChildRoutes},
  {path: 'measure', component: MeasureComponent,children:appChildRoutes}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FileUploadModule
  ],
  declarations: [AreasComponent, DataDictionaryComponent, MeasureComponent, AdddataComponent, RightpageComponent, SiteComponent, StaticsComponent, RecordComponent, AddRedPackageComponent, RpPondComponent, RpStoreComponent, StoreRightPageComponent],
  providers:[DataDictionaryComponent,DataDictionaryComponentService,MeasureService,MeasureComponent,WebstiteService]
})
export class WebsiteModule { }
