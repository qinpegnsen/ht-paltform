import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FourAreasComponent} from "./four-areas/four-areas.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FourAreasComponent],
  exports: [FourAreasComponent]
})
export class FoueAreasModule { }
