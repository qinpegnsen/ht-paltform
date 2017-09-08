import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpCenterComponent } from './help-center.component';
import { HelpAssortmentComponent } from './help-assortment/help-assortment.component';
import { HelpInterlocutionComponent } from './help-interlocution/help-interlocution.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HelpCenterComponent, HelpAssortmentComponent, HelpInterlocutionComponent],
})
export class HelpCenterModule { }
