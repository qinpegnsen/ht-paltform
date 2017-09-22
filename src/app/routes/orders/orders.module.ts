import {NgModule} from "@angular/core";
import {OrdersComponent} from "./orders/orders.component";
import {AllOrdersComponent} from "./orders/all-orders/all-orders.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import { BuyerEvaluationComponent } from './buyer-evaluation/buyer-evaluation.component';
import { OrderDetailComponent } from './orders/order-detail/order-detail.component';
import {DeliverComponent} from './orders/deliver/deliver.component';
import { CancelComponent } from './orders/cancel/cancel.component';
import { LookLogisticsComponent } from './orders/look-logistics/look-logistics.component';
import { AgentEptComponent } from './agent-ept/agent-ept.component';
import { CancelsComponent } from './cancels/cancels.component';
import { OrderReviewComponent } from './order-review/order-review.component';
import { ToAuditComponent } from './order-review/to-audit/to-audit.component';
import { AllOrderComponent } from './order-review/all-order/all-order.component';
import { StoreEvaluationComponent } from './store-evaluation/store-evaluation.component';
import {OrdersService} from "./orders/orders.service";


const routes: Routes = [
  {path: '', redirectTo: 'cust'},
  {
    path: 'cust', component: OrdersComponent, children: [
    {path: '', redirectTo: 'all-orders'},
    {path: 'all-orders', component: AllOrdersComponent},
    {path: 'wait-for-pay', component: AllOrdersComponent},
    {path: 'wait-for-send', component: AllOrdersComponent},
    {path: 'delivered', component: AllOrdersComponent},
    {path: 'finished', component: AllOrdersComponent},
    {path: 'canceled', component: AllOrdersComponent},
    {path: 'order-detail', component: OrderDetailComponent}
  ]
  },
  {path: 'buyer', component: BuyerEvaluationComponent},
  {path: 'store', component: StoreEvaluationComponent},
  {path: 'agent-ept', component: AgentEptComponent},
  {path: 'order-review',component:OrderReviewComponent,children:[
    {path: '', redirectTo: 'all-order'},
    {path: 'all-order', component: AllOrderComponent},
    {path: 'to-audit', component: ToAuditComponent},
  ]}
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
  ],
  declarations: [
    OrdersComponent,
    AllOrdersComponent,
    BuyerEvaluationComponent,
    OrderDetailComponent,
    CancelComponent,
    LookLogisticsComponent,
    DeliverComponent,
    AgentEptComponent,
    CancelsComponent,
    OrderReviewComponent,
    ToAuditComponent,
    AllOrderComponent,
    StoreEvaluationComponent
  ],
  providers: [
    OrdersComponent,
    BuyerEvaluationComponent,
    AgentEptComponent,
    StoreEvaluationComponent,
    OrdersService
  ]
})
export class OrdersModule { }
