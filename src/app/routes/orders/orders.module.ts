import {NgModule} from "@angular/core";
import {OrdersComponent} from "./orders/orders.component";
import {AllOrdersComponent} from "./orders/all-orders/all-orders.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import { BuyerEvaluationComponent } from './buyer-evaluation/buyer-evaluation.component';
import { OrderDetailComponent } from './orders/order-detail/order-detail.component';
import {DeliverComponent} from './orders/deliver/deliver.component';
import { CancelComponent } from './orders/cancel/cancel.component';
import { AgentEptComponent } from './agent-ept/agent-ept.component';
import { CancelsComponent } from './cancels/cancels.component';
import { OrderReviewComponent } from './order-review/order-review.component';
import { ToAuditComponent } from './order-review/to-audit/to-audit.component';
import { AllOrderComponent } from './order-review/all-order/all-order.component';
import { StoreEvaluationComponent } from './store-evaluation/store-evaluation.component';
import {OrdersService} from "./orders/orders.service";
import {StockComponent} from './stock/stock.component';
import {AllStockComponent} from './stock/all-stock/all-stock.component';
import {PendingPaymentComponent} from './stock/pending-payment/pending-payment.component';
import {ForDistributionComponent} from './stock/for-distribution/for-distribution.component';
import {AwaitingDeliveryComponent} from './stock/awaiting-delivery/awaiting-delivery.component';
import {CompleteComponent} from './stock/complete/complete.component';
import {StockDetailComponent} from './stock/stock-detail/stock-detail.component';
import {CuccessComponent} from './stock/cuccess/cuccess.component';
import { LogisticsComponent } from './stock/logistics/logistics.component';
import {ForFistributonService} from './stock/for-distribution/for-fistributon.service';
import {AllStockService} from './stock/all-stock/all-stock.service';
import {OrderService} from "./order.service";
import { BankTransferComponent } from './stock/bank-transfer/bank-transfer.component';
import {FileUploadModule} from "_ng2-file-upload@1.2.1@ng2-file-upload";
import {AllOrderService} from './order-review/all-order/all-order.service';
import { AuditComponent } from './order-review/audit/audit.component';


const routes: Routes = [
  {path: '', redirectTo: 'cust'},
  {
    path: 'cust', component: OrdersComponent, children: [
    {path: '', redirectTo: 'all-orders'},
    {path: 'all-orders', component: AllOrdersComponent},
    {path: 'wait-for-send', component: AllOrdersComponent},
    {path: 'delivery', component: AllOrdersComponent},
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
    {path: 'to-audit', component: ToAuditComponent}
  ]},
  {path: 'ord', component:StockComponent,children:[
    {path: '', redirectTo: 'all-stock'},
    {path: 'all-stock', component: AllStockComponent},
    {path: 'pending-payment', component: PendingPaymentComponent},
    {path: 'for-distribution', component: ForDistributionComponent},
    {path: 'awaiting-delivery', component: AwaitingDeliveryComponent},
    {path: 'complete', component: CompleteComponent},
    {path: 'success', component: CuccessComponent},
    {path: 'stock-detail', component: StockDetailComponent}
  ]}
]

@NgModule({
  imports: [
    FileUploadModule,
    RouterModule.forChild(routes),
    SharedModule,

  ],
  declarations: [
    OrdersComponent,
    AllOrdersComponent,
    BuyerEvaluationComponent,
    OrderDetailComponent,
    CancelComponent,
    DeliverComponent,
    AgentEptComponent,
    CancelsComponent,
    OrderReviewComponent,
    ToAuditComponent,
    AllOrderComponent,
    StoreEvaluationComponent,
    StockComponent,
    AllStockComponent,
    PendingPaymentComponent,
    ForDistributionComponent,
    AwaitingDeliveryComponent,
    CompleteComponent,
    CancelComponent,
    StockDetailComponent,
    CancelsComponent,
    CuccessComponent,
    LogisticsComponent,
    BankTransferComponent,
    AuditComponent,
  ],
  providers: [
    OrdersComponent,
    BuyerEvaluationComponent,
    AgentEptComponent,
    StoreEvaluationComponent,
    OrdersService,
    ForFistributonService,
    AllStockService,
    AwaitingDeliveryComponent,
    StockComponent,
    OrderService,
    AllStockComponent,
    AllOrderService
  ]
})
export class OrdersModule { }
