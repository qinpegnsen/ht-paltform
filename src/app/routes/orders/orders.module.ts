import {NgModule} from "@angular/core";
import {OrdersComponent} from "./orders/orders.component";
import {WaitForPayComponent} from "./orders/wait-for-pay/wait-for-pay.component";
import {AllOrdersComponent} from "./orders/all-orders/all-orders.component";
import {WaitForEvalComponent} from "./orders/wait-for-eval/wait-for-eval.component";
import { WaitForSendComponent } from './orders/wait-for-send/wait-for-send.component';
import {FinishedComponent} from "./orders/finished/finished.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import { BuyerEvaluationComponent } from './buyer-evaluation/buyer-evaluation.component';
import { OrderDetailComponent } from './orders/order-detail/order-detail.component';


const routes: Routes = [
  {path: '', redirectTo: 'order'},
  {
    path: 'order', component: OrdersComponent, children: [
    {path: '', redirectTo: 'all-orders'},
    {path: 'all-orders', component: AllOrdersComponent},
    {path: 'wait-for-pay', component: WaitForPayComponent},
    {path: 'wait-for-send', component: WaitForSendComponent},
    {path: 'wait-for-eval', component: WaitForEvalComponent},
    {path: 'finished', component: FinishedComponent},
    {path: 'order-detail', component: OrderDetailComponent}
  ]
  },
  {path: 'buyer', component: BuyerEvaluationComponent}

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
    WaitForEvalComponent,
    FinishedComponent,
    BuyerEvaluationComponent,
    FinishedComponent,
    WaitForSendComponent,
    OrderDetailComponent
  ],
  providers: [
    OrdersComponent,
    BuyerEvaluationComponent
  ]
})
export class OrdersModule { }
