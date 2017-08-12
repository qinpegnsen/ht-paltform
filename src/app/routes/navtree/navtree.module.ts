import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavtreeComponent} from "./navtree/navtree.component";
import {TreeModule} from "angular-tree-component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: '', component: NavtreeComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TreeModule
  ],
  declarations: [NavtreeComponent]
})
export class NavtreeModule { }
