import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPwComponent } from './edit-pw/edit-pw.component';
import {SharedModule} from "../../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
  {path: '', component: EditPwComponent},
  {path: 'edit-pw', component: EditPwComponent},
];
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditPwComponent]
})
export class EditPwModule { }
