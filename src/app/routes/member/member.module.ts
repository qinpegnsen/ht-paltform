import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberComponent } from './member/member.component';
import {RouterModule, Routes} from "@angular/router";
import {RzhButtonsModule} from "../buttons/rzh-buttons.module";
import {SharedModule} from "../../shared/shared.module";
import {IntegrationManagementComponent} from "./integration-management/integration-management.component";
import {IntegrationChangeComponent} from "./integration-management/integration-change/integration-change.component";
import {IntegrationDetailsComponent} from "./integration-management/integration-details/integration-details.component";
import {CertificationComponent} from "./certification/certification.component";
import {IntegrationImportComponent} from "./integration-management/integration-import/integration-import.component";

const userChildRoutes: Routes = [
  {path: 'integration-details', component: IntegrationDetailsComponent},
  {path: 'integration-change', component: IntegrationChangeComponent},
  {path: 'integration-import', component: IntegrationImportComponent},
]

const routes: Routes = [
  {path: '',redirectTo:'users'},
  {path: 'users', component: MemberComponent},
  {path: 'certification', component: CertificationComponent},
  {path: 'integration-management', component: IntegrationManagementComponent,children: userChildRoutes},
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    RzhButtonsModule
  ],
  declarations: [MemberComponent,IntegrationManagementComponent, IntegrationDetailsComponent,
    IntegrationChangeComponent,CertificationComponent,IntegrationImportComponent]
})
export class MemberModule { }
