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
import { ReturnComponent } from './after/return/return.component';
import {AngularEchartsModule} from "ngx-echarts";
import { ListDetailComponent } from './users/list-detail/list-detail.component';
import { OrderAmountComponent } from './xtsz/order-amount/order-amount.component';

const xtszChildRoutes:Routes = [
  {path: 'cache-reset', component:CacheResetComponent},
  {path: 'order-amount', component:OrderAmountComponent},

]
const usersChildRoutes:Routes = [
  {path: 'analyze-area', component:AnalyzeAreaComponent},
  {path: 'analyze-buy', component:AnalyzeBuyComponent},
  {path: 'analyze-users', component:AnalyzeUsersComponent},
  {path: 'users-new', component:UsersNewComponent},
  {path: 'list-detail', component:ListDetailComponent},
]

const salesChildRoutes:Routes = [
  {path: 'settle', component:SettleComponent},
  {path: 'orders', component:OrdersComponent},
]
const goodsChildRoutes:Routes = [
  {path: 'hot-sale', component:HotSaleComponent},
  {path: 'sale-detail', component:SaleDetailComponent},
]
const afterChildRoutes:Routes = [
  {path: 'refund', component:RefundComponent},
  {path: 'return', component:ReturnComponent},
]
const routes: Routes = [
  {path: '',redirectTo:'xtsz'},
  {path: 'xtsz', component:XtszComponent,children:xtszChildRoutes},
  {path: 'users', component: UsersComponent,children:usersChildRoutes},
  {path: 'sales', component:SalesComponent,children:salesChildRoutes},
  {path: 'goods', component: GoodsComponent,children:goodsChildRoutes},
  {path: 'after', component: AfterComponent,children:afterChildRoutes},
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
    ReturnComponent,
    ListDetailComponent,
    OrderAmountComponent,]
})
export class StatisticsModule { }
