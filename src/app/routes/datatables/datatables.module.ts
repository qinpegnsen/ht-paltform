import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {Ng2DatatableComponent} from './ng2-datatable/ng2-datatable.component';
import {SharedModule} from "../../shared/shared.module";
import {DatatablesComponent} from "./datatables/datatables.component";

const routes: Routes = [
  {path: 'datatable', component: DatatablesComponent},
  {path: 'ng2-datatable', component: Ng2DatatableComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [DatatablesComponent, Ng2DatatableComponent]
})

export class DatatablesModule {
}
