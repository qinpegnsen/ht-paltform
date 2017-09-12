import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntegrationManagementComponent } from './integration-management.component';
import { IntegrationDetailsComponent } from './integration-details/integration-details.component';
import { IntegrationChangeComponent } from './integration-change/integration-change.component';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";
import {routes} from "../../routes";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [IntegrationManagementComponent, IntegrationDetailsComponent, IntegrationChangeComponent]
})
export class IntegrationManagementModule { }
