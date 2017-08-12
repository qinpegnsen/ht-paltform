import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonsComponent} from "./buttons/buttons.component";
import {ButtonDemoComponent} from "./buttonDemo/button-demo.component";
import { StatesComponent } from './states/states.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ButtonsComponent,
    ButtonDemoComponent,
    StatesComponent
  ],
  exports:[
    ButtonsComponent,
    ButtonDemoComponent,
    StatesComponent
  ]
})
export class RzhButtonsModule {
}
