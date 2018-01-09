import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SearchComponent} from "./search.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    SearchComponent
  ],
  exports: [
    SearchComponent
  ]
})
export class SearchModule { }
