import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CashCheckComponent} from "./cash-check/cash-check.component";
import {CashRecordComponent} from "./cash-record/cash-record.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {FileUploadModule} from "ng2-file-upload";
import {AddStoreRecordComponent} from "./add-store-record/add-store-record.component";
import {AgreeCashComponent} from "./agree-cash/agree-cash.component";


const routes: Routes = [
  {path: '', redirectTo:'record'},
  {path: 'record', component: CashRecordComponent},
  {path: 'check', component: CashCheckComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FileUploadModule
  ],
  declarations: [CashCheckComponent, CashRecordComponent, AddStoreRecordComponent, AgreeCashComponent]
})
export class StoreModule { }
