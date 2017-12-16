import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CashCheckComponent} from "./cash-check/cash-check.component";
import {CashRecordComponent} from "./cash-record/cash-record.component";
import {Routes} from "@angular/router";


const routes: Routes = [
  {path: '', redirectTo:'record'},
  {path: 'record', component: CashRecordComponent},
  {path: 'check', component: CashCheckComponent},
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CashCheckComponent, CashRecordComponent]
})
export class StoreModule { }
