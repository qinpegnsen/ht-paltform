import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {FileUploadModule} from "ng2-file-upload";
import { XtszComponent } from './xtsz/xtsz.component';
import {CacheResetComponent} from "./xtsz/cache-reset/cache-reset.component";
import { UsersComponent } from './users/users.component';
import { UsersNewComponent } from './users/users-new/users-new.component';
import { AnalyzeUsersComponent } from './users/analyze-users/analyze-users.component';
import { AnalyzeAreaComponent } from './users/analyze-area/analyze-area.component';
import { AnalyzeBuyComponent } from './users/analyze-buy/analyze-buy.component';
import { SalesComponent } from './sales/sales.component';
import { SettleComponent } from './sales/settle/settle.component';
import { OrdersComponent } from './sales/orders/orders.component';
import { GoodsComponent } from './goods/goods.component';
import { HotSaleComponent } from './goods/hot-sale/hot-sale.component';
import { SaleDetailComponent } from './goods/sale-detail/sale-detail.component';
import { AfterComponent } from './after/after.component';
import { RefundComponent } from './after/refund/refund.component';
import { ListDetailComponent } from './users/list-detail/list-detail.component';
import { OrderAmountComponent } from './xtsz/order-amount/order-amount.component';
import { CommodityPriceComponent } from './xtsz/commodity-price/commodity-price.component';


const routes: Routes = [
  {path: '',redirectTo:'order-amount'},
  {path: 'order-amount', component:OrderAmountComponent},
  {path: 'commodity-price', component:CommodityPriceComponent},
  {path: 'analyze-area', component:AnalyzeAreaComponent},
  {path: 'analyze-buy', component:AnalyzeBuyComponent},
  {path: 'analyze-users', component:AnalyzeUsersComponent},
  {path: 'users-new', component:UsersNewComponent},
  {path: 'list-detail', component:ListDetailComponent},
  {path: 'settle', component:SettleComponent},
  {path: 'orders', component:OrdersComponent},
  {path: 'hot-sale', component:HotSaleComponent},
  {path: 'sale-detail', component:SaleDetailComponent},
  {path: 'refund', component:RefundComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    FileUploadModule,
    CommonModule
  ],
  declarations: [
    CacheResetComponent,
    XtszComponent,
    UsersComponent,
    UsersNewComponent,
    AnalyzeUsersComponent,
    AnalyzeAreaComponent,
    AnalyzeBuyComponent,
    SalesComponent,
    SettleComponent,
    OrdersComponent,
    GoodsComponent,
    HotSaleComponent,
    SaleDetailComponent,
    AfterComponent,
    RefundComponent,
    ListDetailComponent,
    OrderAmountComponent,
    CommodityPriceComponent,]
})
export class StatisticsModule { }
