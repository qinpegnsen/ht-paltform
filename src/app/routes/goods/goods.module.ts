import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {FileUploadModule} from "ng2-file-upload";
import {GoodsService} from "./goods.service";
import {SubmitService} from "../../core/forms/submit.service";
import {PublishComponent} from "./publish/publish.component";
import {ManageComponent} from "./plat-goods/manage/manage.component";
import {BrandsComponent} from "./brands/brands.component";
import {KindManageComponent} from "./kind-manage/kind-manage.component";
import {AddKindComponent} from "./add-kind/add-kind.component";
import {AddBrandComponent} from "./add-brand/add-brand.component";
import {ChooseKindComponent} from "./choose-kind/choose-kind.component";
import {PublishedComponent} from "./published/published.component";
import {AuditGoodsComponent} from "./plat-goods/audit-goods/audit-goods.component";
import {WholesaleComponent} from "./wholesale/wholesale.component";
import {BasicPropertiesComponent} from "./basic-properties/basic-properties.component";
import {AddDataComponent} from "./add-data/add-data.component";
import {UpdateDataComponent} from "./update-data/update-data.component";
import {UnAuditComponent} from "./plat-goods/un-audit/un-audit.component";
import {SkuGoodsComponent} from "./sku-goods/sku-goods.component";
import {EditDetailComponent} from "./edit-detail/edit-detail.component";
import {DataTable} from "../../shared/directives/ng2-datatable/DataTable";
import {AuditBrandComponent} from "./audit-brand/audit-brand.component";
import {AuditListComponent} from "./audit-brand/audit-list/audit-list.component";
import {AuditWindowComponent} from "./audit-brand/audit-window/audit-window.component";
import {AuditDetailComponent} from "./audit-brand/audit-detail/audit-detail.component";
import {SortBindKindComponent} from "./sort-bind-kind/sort-bind-kind.component";
import {StoresGoodsComponent} from "./store-goods/stores-goods/stores-goods.component";
import {StoreUnAuditComponent} from "./store-goods/store-un-audit/store-un-audit.component";
import {AuditStoreGoodsComponent} from "./store-goods/audit-store-goods/audit-store-goods.component";

// 父路由，用于页面嵌套显示
const routes: Routes = [
  {path: 'publish', component: PublishComponent, children: [
    {path: '', redirectTo: 'step_one'},
    {path: 'step_one', component: ChooseKindComponent},
    {path: 'step_two', component: EditDetailComponent},
    {path: 'step_three', component: PublishedComponent},
  ]},
  {path: '', redirectTo: 'plat'},
  {path: 'plat', children: [
    {path: '', redirectTo: 'manage'},
    {path: 'manage', component: ManageComponent, children: [
      {path: 'edit', component: EditDetailComponent},
      {path: 'detail', component: AuditGoodsComponent},
      {path: 'audit', component: AuditGoodsComponent}
    ]},
    {path: 'unAudit', component: UnAuditComponent, children: [
      {path: 'detail', component: AuditGoodsComponent},
      {path: 'audit', component: AuditGoodsComponent}]
    },
    {path: 'publish', component: PublishComponent, children: [
      {path: '', redirectTo: 'step_one'},
      {path: 'step_one', component: ChooseKindComponent},
      {path: 'step_two', component: EditDetailComponent},
      {path: 'step_three', component: PublishedComponent},
    ]}
  ]},
  {path: 'store', children: [
    {path: '', redirectTo: 'manage'},
    {path: 'manage', component: StoresGoodsComponent, children: [
      {path: 'detail', component: AuditStoreGoodsComponent},
      {path: 'edit', component: EditDetailComponent},
      {path: 'audit', component: AuditStoreGoodsComponent}
    ]},
    {path: 'unAudit', component: StoreUnAuditComponent, children: [
      {path: 'detail', component: AuditStoreGoodsComponent},
      {path: 'audit', component: AuditStoreGoodsComponent}]
    }
  ]},
  {
    path: 'kind-manage', component: KindManageComponent, children: [
    {path: 'addKind', component: AddKindComponent},
    {path: 'upKind', component: AddKindComponent},
    {path: 'upKindImg', component: AddKindComponent}
  ]
  },
  {
    path: 'kind-manage', component: KindManageComponent, children: [
    {path: 'addKind', component: AddKindComponent},
    {path: 'upKind', component: AddKindComponent},
    {path: 'upKindImg', component: AddKindComponent}
  ]
  },
  {path: 'wholesale', component: WholesaleComponent},
  {path: 'basic', component: BasicPropertiesComponent},
  {
    path: 'brands', component: BrandsComponent, children: [
    {path: 'addBrand', component: AddBrandComponent},
    {path: 'upBrand', component: AddBrandComponent},
    {path: 'upBrandImg', component: AddBrandComponent},
    {path: 'brandDetail', component: AddBrandComponent}
  ]
  },
  {
    path: 'auditBrand', component: AuditBrandComponent, children: [
    {path: '', redirectTo: 'unAudit'},
    {path: 'unAudit', component: AuditListComponent,children: [
      {path: 'audit', component: AuditWindowComponent},
      {path: 'detail', component: AuditDetailComponent},
    ]},
    {path: 'audited', component: AuditListComponent,children: [
      {path: 'detail', component: AuditDetailComponent},
    ]},
    {path: 'reject', component: AuditListComponent,children: [
      {path: 'detail', component: AuditDetailComponent},
    ]}
  ]},
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    FileUploadModule
  ],
  declarations: [
    PublishComponent,
    ManageComponent,
    BrandsComponent,
    KindManageComponent,
    AddKindComponent,
    AddBrandComponent,
    ChooseKindComponent,
    EditDetailComponent,
    AuditGoodsComponent,
    PublishedComponent,
    WholesaleComponent,
    BasicPropertiesComponent,
    AddDataComponent,
    UpdateDataComponent,
    UnAuditComponent,
    SkuGoodsComponent,
    AuditBrandComponent,
    AuditListComponent,
    AuditWindowComponent,
    AuditDetailComponent,
    SortBindKindComponent,
    AuditStoreGoodsComponent,
    StoresGoodsComponent,
    StoreUnAuditComponent,
  ],
  providers: [
    GoodsService,
    SubmitService,
    PublishComponent,
    BrandsComponent,
    KindManageComponent,
    ManageComponent,
    AddDataComponent,
    UpdateDataComponent,
    DataTable
  ]
})
export class GoodsModule {
}
