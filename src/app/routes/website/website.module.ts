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
import {FileUploadModule} from "ng2-file-upload";

const appChildRoutes: Routes = [
  {path: 'adddata', component: AdddataComponent},
  {path: 'rightpage', component: RightpageComponent}
]
const routes: Routes = [
  {path:'',redirectTo:'areas'},
  {path: 'areas', component: AreasComponent,children:appChildRoutes},
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
  declarations: [AreasComponent, DataDictionaryComponent, MeasureComponent, AdddataComponent, RightpageComponent],
  providers:[DataDictionaryComponent,DataDictionaryComponentService,MeasureService,MeasureComponent]
})
export class WebsiteModule { }
