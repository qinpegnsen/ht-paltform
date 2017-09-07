import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextEditingComponent } from './text-editing/text-editing.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
const routes: Routes = [
  {path: '', component: TextEditingComponent},
  {path: 'text-editing', component: TextEditingComponent},
];
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TextEditingComponent]
})
export class TextEditingModule { }
