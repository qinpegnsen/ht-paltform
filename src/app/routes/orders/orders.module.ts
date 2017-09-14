import {NgModule} from "@angular/core";
import {OrdersComponent} from "./orders/orders.component";
import {WaitForPayComponent} from "./orders/wait-for-pay/wait-for-pay.component";
import {AllOrdersComponent} from "./orders/all-orders/all-orders.component";
import {WaitForTakeComponent} from "./orders/wait-for-take/wait-for-take.component";
import {WaitForEvalComponent} from "./orders/wait-for-eval/wait-for-eval.component";
import {FinishedComponent} from "./orders/finished/finished.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";


const routes: Routes = [
  {path: '', redirectTo: 'order'},
  {
    path: 'order', component: OrdersComponent, children: [
    {path: '', redirectTo: 'all-orders'},
    {path: 'all-orders', component: AllOrdersComponent},
    {path: 'wait-for-pay', component: WaitForPayComponent},
    {path: 'wait-for-take', component: WaitForTakeComponent},
    {path: 'wait-for-eval', component: WaitForEvalComponent},
    {path: 'finished', component: FinishedComponent},
  ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
  ],
  declarations: [
    OrdersComponent,
    WaitForPayComponent,
    AllOrdersComponent,
    WaitForTakeComponent,
    WaitForEvalComponent,
    FinishedComponent
  ],
  providers: [
    OrdersComponent
  ]
})
export class OrdersModule { }
