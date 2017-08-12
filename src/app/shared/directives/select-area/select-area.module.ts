import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SelectAreaComponent} from "./select-area/select-area.component";
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [SelectAreaComponent],
  exports: [SelectAreaComponent]
})
export class SelectAreaModule { }
