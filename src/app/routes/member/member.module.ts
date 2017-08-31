import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberComponent } from './member/member.component';
import {RouterModule, Routes} from "@angular/router";
import {RzhButtonsModule} from "../buttons/rzh-buttons.module";
import {SharedModule} from "../../shared/shared.module";
const routes: Routes = [
  {path: '',redirectTo:'users'},
  {path: 'users', component: MemberComponent}
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    RzhButtonsModule
  ],
  declarations: [MemberComponent]
})
export class MemberModule { }
