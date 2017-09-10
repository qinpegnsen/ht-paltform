import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpCenterComponent } from './help-center.component';
import { HelpAssortmentComponent } from './help-assortment/help-assortment.component';
import { HelpInterlocutionComponent } from './help-interlocution/help-interlocution.component';
import { AddrightpageComponent } from './addrightpage/addrightpage.component';
import {RouterModule} from "@angular/router";
import {routes} from "../../routes";
import {SharedModule} from "../../../shared/shared.module";
import { ProblemDetailsComponent } from './problem-details/problem-details.component';
import { HelpAnswerComponent } from './help-answer/help-answer.component';
import { HelpUpdateComponent } from './help-update/help-update.component';
import { ViewProblemComponent } from './view-problem/view-problem.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [HelpCenterComponent, HelpAssortmentComponent, HelpInterlocutionComponent,AddrightpageComponent, ProblemDetailsComponent, HelpAnswerComponent, HelpUpdateComponent, ViewProblemComponent],
})
export class HelpCenterModule { }
