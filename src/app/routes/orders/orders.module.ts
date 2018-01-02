import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import { BuyerEvaluationComponent } from './buyer-evaluation/buyer-evaluation.component';
import { AgentEptComponent } from './agent-ept/agent-ept.component';
import { CancelsComponent } from './cancels/cancels.component';
import { OrderReviewComponent } from './order-review/order-review.component';
import { ToAuditComponent } from './order-review/to-audit/to-audit.component';
import { AllOrderComponent } from './order-review/all-order/all-order.component';
import { StoreEvaluationComponent } from './store-evaluation/store-evaluation.component';
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
import {AllOrderService} from './order-review/all-order/all-order.service';
import { AuditComponent } from './order-review/audit/audit.component';
import { ToRefundComponent } from './order-review/to-refund/to-refund.component';
import { RefundComponent } from './order-review/refund/refund.component';
import {ReviewDetailComponent} from './order-review/review-detail/review-detail.component';
import {StockService} from './stock/stock.service';
import {OrderReviewService} from './order-review/order-review.service';
import { EptDetailComponent } from './ept-detail/ept-detail.component';
import { RefundDetailComponent } from './order-review/refund-detail/refund-detail.component';
import { SettleComponent } from './settle/settle.component';
import {FileUploadModule} from "ng2-file-upload";


const routes: Routes = [
  {path: '', redirectTo: 'buyer'},
  {path: 'buyer', component: BuyerEvaluationComponent},
  // {path: 'store', component: StoreEvaluationComponent},
  {path: 'settle', component: SettleComponent},
  {path: 'agent-ept', component: AgentEptComponent},
  {path: 'ept-detail', component: EptDetailComponent},
  {path: 'order-review',component:OrderReviewComponent,children:[
    {path: '', redirectTo: 'all-order'},
    {path: 'all-order', component: AllOrderComponent},
    {path: 'to-audit', component: ToAuditComponent},
    {path: 'review-detail', component: ReviewDetailComponent},
    {path: 'refund-detail', component: RefundDetailComponent},
    {path: 'to-audit', component: ToAuditComponent},
    {path: 'to-refund', component: ToRefundComponent}
  ]},
  {
    path: 'ord', component:StockComponent,children:[
    {path: '', redirectTo: 'all-stock'},
    {path: 'all-stock', component: AllStockComponent,children: [
      {path: 'stock-detail', component: StockDetailComponent}
    ]},
    {path: 'pending-payment', component: PendingPaymentComponent,children: [
      {path: 'stock-detail', component: StockDetailComponent}
    ]},
    {path: 'for-distribution', component: ForDistributionComponent,children: [
      {path: 'stock-detail', component: StockDetailComponent}
    ]},
    {path: 'awaiting-delivery', component: AwaitingDeliveryComponent,children: [
      {path: 'stock-detail', component: StockDetailComponent}
    ]},
    {path: 'complete', component: CompleteComponent,children: [
      {path: 'stock-detail', component: StockDetailComponent}
    ]},
    {path: 'success', component: CuccessComponent,children: [
      {path: 'stock-detail', component: StockDetailComponent}
    ]},
    {path: 'stock-detail', component: StockDetailComponent}
  ]
  }
]

@NgModule({
  imports: [
    FileUploadModule,
    RouterModule.forChild(routes),
    SharedModule,

  ],
  declarations: [
    BuyerEvaluationComponent,
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
    StockDetailComponent,
    CancelsComponent,
    CuccessComponent,
    LogisticsComponent,
    BankTransferComponent,
    AuditComponent,
    ToRefundComponent,
    RefundComponent,
    ReviewDetailComponent,
    EptDetailComponent,
    RefundDetailComponent,
    SettleComponent,
  ],
  providers: [
    BuyerEvaluationComponent,
    AgentEptComponent,
    StoreEvaluationComponent,
    ForFistributonService,
    AllStockService,
    AwaitingDeliveryComponent,
    StockComponent,
    OrderService,
    AllStockComponent,
    AllOrderService,
    PendingPaymentComponent,
    AllOrderComponent,
    ToAuditComponent,
    OrderReviewComponent,
    ToRefundComponent,
    OrderReviewComponent,
    StockService,
    OrderReviewService,
    RefundDetailComponent
  ]
})
export class OrdersModule { }
