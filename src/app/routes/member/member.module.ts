import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MemberComponent} from "./member/member.component";
import {RouterModule, Routes} from "@angular/router";
import {RzhButtonsModule} from "../buttons/rzh-buttons.module";
import {SharedModule} from "../../shared/shared.module";
import {IntegrationChangeComponent} from "./integration-management/integration-change/integration-change.component";
import {IntegrationDetailsComponent} from "./integration-management/integration-details/integration-details.component";
import {CertificationComponent} from "./certification/certification.component";
import {IntegrationImportComponent} from "./integration-management/integration-import/integration-import.component";
import {FileUploadModule} from "ng2-file-upload";
import {ProgressmaskComponent} from "./integration-management/progressmask/progressmask.component";
import { ReasonRejecComponent } from "./reason-rejec/reason-rejec.component";
import { RpDetailComponent } from "./rp-detail/rp-detail.component";
import {MemberService} from "./member.service";

const userChildRoutes: Routes = [
  {path: '', component: IntegrationDetailsComponent},
  {path: 'details', component: IntegrationDetailsComponent},
  {path: 'change', component: IntegrationChangeComponent},
  {path: 'import', component: IntegrationImportComponent},
  {path: 'progressmask', component: ProgressmaskComponent}
]

const routes: Routes = [
  {path: '', redirectTo: 'users'},
  {path: 'users', component: MemberComponent},
  {path: 'rpDetail', component: RpDetailComponent},
  {path: 'certification', component: CertificationComponent},
  {path: 'inte-manage', children: userChildRoutes}
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FileUploadModule,
    RzhButtonsModule
  ],
  declarations: [
    MemberComponent,
    CertificationComponent,
    ReasonRejecComponent,
    IntegrationDetailsComponent,
    IntegrationChangeComponent,
    IntegrationImportComponent,
    ProgressmaskComponent,
    RpDetailComponent
  ],
  providers:[MemberService]
})
export class MemberModule { }
