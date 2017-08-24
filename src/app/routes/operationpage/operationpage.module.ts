import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OperationpageComponent} from './operationpage/operationpage.component';
import {RouterModule, Routes} from '@angular/router';
import {RightpageComponent} from './rightpage/rightpage.component';
import {SharedModule} from '../../shared/shared.module';

// 子路由，用于页面嵌套显示
const appChildRoutes: Routes = [
  {path: 'rightpage', component: RightpageComponent}
];

// 父路由，用于页面嵌套显示
const routes: Routes = [
  {path: '', component: OperationpageComponent, children: appChildRoutes},
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OperationpageComponent, RightpageComponent]
})
export class OperationpageModule {
}
