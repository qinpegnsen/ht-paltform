import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EchartsComponent } from './echarts/echarts.component';
import {RouterModule, Routes} from '@angular/router';
import {AngularEchartsModule} from 'ngx-echarts';

const routes: Routes = [
  {path: '', component: EchartsComponent},
];

@NgModule({
  imports: [
    AngularEchartsModule,
    RouterModule.forChild(routes),
    CommonModule
  ],
  declarations: [EchartsComponent] //引入图表模块
})
export class EchartsModule { }
