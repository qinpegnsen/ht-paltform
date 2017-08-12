import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MsgComponent} from './msg/msg.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', component: MsgComponent},
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    CommonModule
  ],
  declarations: [MsgComponent]
})
export class MsgModule {
}
