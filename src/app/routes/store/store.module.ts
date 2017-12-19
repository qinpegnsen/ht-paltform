import {NgModule} from "@angular/core";
import {CashCheckComponent} from "./cash-check/cash-check.component";
import {CashRecordComponent} from "./cash-record/cash-record.component";
import {StoreAuditComponent} from "./stores/store-audit/store-audit.component";
import {AllStoreComponent} from "./stores/all-store/all-store.component";
import {ShopAuditComponent} from "./shops/shop-audit/shop-audit.component";
import {AllShopComponent} from "./shops/all-shop/all-shop.component";
import {StoreDetailComponent} from "./stores/store-detail/store-detail.component";
import {ShopDetailComponent} from "./shops/shop-detail/shop-detail.component";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {FileUploadModule} from "ng2-file-upload";
import {AddStoreRecordComponent} from "./add-store-record/add-store-record.component";
import {AgreeCashComponent} from "./agree-cash/agree-cash.component";
import {StoresComponent} from "./stores/stores.component";
import {ShopsComponent} from "./shops/shops.component";
import {StoreService} from "./store.service";


const routes: Routes = [
  /*提现管理*/
  {path: '', redirectTo: 'check'},
  {path: 'check', component: CashCheckComponent},
  {path: 'record', component: CashRecordComponent},

  /*企业管理*/
  {
    path: 'stores', component: StoresComponent, children: [
    {path: '', redirectTo: 'allStore'},
    {path: 'allStore', component: AllStoreComponent, children: [
      {path: 'detail', component: StoreDetailComponent},
    ]},
    {path: 'normal', component: AllStoreComponent, children: [
      {path: 'detail', component: StoreDetailComponent}
    ]},
    {path: 'half', component: AllStoreComponent, children: [
      {path: 'detail', component: StoreDetailComponent}
    ]},
    {path: 'audit', component: AllStoreComponent, children: [
      {path: 'detail', component: StoreDetailComponent}
    ]},
    {path: 'reject', component: AllStoreComponent, children: [
      {path: 'detail', component: StoreDetailComponent}
    ]},
    {path: 'black', component: AllStoreComponent, children: [
      {path: 'detail', component: StoreDetailComponent}
    ]},
  ]
  },
  {
    path: 'storeAudit', component: AllStoreComponent, children: [
    {path: 'audit', component: StoreAuditComponent},
    {path: 'detail', component: StoreDetailComponent}
  ]
  },

  /*店铺管理*/
  {
    path: 'shops', component: ShopsComponent, children: [
    {path: '', redirectTo: 'allShop'},
    {path: 'allShop', component: AllShopComponent, children: [
      {path: 'detail', component: ShopDetailComponent}
    ]},
    {path: 'normal', component: AllShopComponent, children: [
      {path: 'detail', component: ShopDetailComponent}
    ]},
    {path: 'pending', component: AllShopComponent, children: [
      {path: 'detail', component: ShopDetailComponent}
    ]},
    {path: 'reject', component: AllShopComponent, children: [
      {path: 'detail', component: ShopDetailComponent}
    ]},
    {path: 'close', component: AllShopComponent, children: [
      {path: 'detail', component: ShopDetailComponent}
    ]},
    ]
  },
  {
    path: 'shopAudit', component: AllShopComponent, children: [
    {path: 'audit', component: ShopAuditComponent},
    {path: 'detail', component: ShopDetailComponent}
  ]
  },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    FileUploadModule
  ],
  declarations: [
    CashCheckComponent,
    CashRecordComponent,
    AddStoreRecordComponent,
    AgreeCashComponent,
    AllStoreComponent,
    StoreAuditComponent,
    AllShopComponent,
    ShopAuditComponent,
    StoreDetailComponent,
    ShopDetailComponent,
    StoresComponent,
    ShopsComponent
  ],
  providers: [
    StoresComponent,
    ShopsComponent,
    StoreService
  ]
})
export class StoreModule { }
