import {NgModule} from "@angular/core";
import {PublishComponent} from "./publish/publish.component";
import {ManageComponent} from "./manage/manage.component";
import {BrandsComponent} from "./brands/brands.component";
import {KindManageComponent} from "./kind-manage/kind-manage.component";
import {RouterModule, Routes} from "@angular/router";
import {AddKindComponent} from "./add-kind/add-kind.component";
import {SharedModule} from "../../shared/shared.module";
import {AddBrandComponent} from "./add-brand/add-brand.component";
import {ChooseKindComponent} from "./choose-kind/choose-kind.component";
import {FileUploadModule} from "ng2-file-upload";
import {GoodsService} from "./goods.service";
import {SubmitService} from "../../core/forms/submit.service";
import {PublishedComponent} from "./published/published.component";
import {EditDetailComponent} from "./edit-detail/edit-detail.component";
import {AuditGoodsComponent} from "./audit-goods/audit-goods.component";
import {WholesaleComponent} from "./wholesale/wholesale.component";
import {BasicPropertiesComponent} from "./basic-properties/basic-properties.component";
import {AddDataComponent} from "./add-data/add-data.component";
import {UpdateDataComponent} from "./update-data/update-data.component";
import {UnAuditComponent} from "./un-audit/un-audit.component";
import {SkuGoodsComponent} from "./sku-goods/sku-goods.component";
import {DataTable} from "../../shared/directives/ng2-datatable/DataTable";


// 父路由，用于页面嵌套显示
const routes: Routes = [
  {path: '', redirectTo: 'unAudit'},
  {
    path: 'unAudit', component: UnAuditComponent, children: [
    {path: 'detail', component: AuditGoodsComponent},
    {path: 'audit', component: AuditGoodsComponent}]
  },
  {
    path: 'publish', component: PublishComponent, children: [
    {path: '', redirectTo: 'step_one'},
    {path: 'step_one', component: ChooseKindComponent},
    {path: 'step_two', component: EditDetailComponent},
    {path: 'step_three', component: PublishedComponent},
  ]
  },
  {
    path: 'manage', component: ManageComponent, children: [
    {path: 'edit', component: EditDetailComponent},
    {path: 'detail', component: AuditGoodsComponent},
    {path: 'audit', component: AuditGoodsComponent}
  ]
  },
  {path: 'wholesale', component: WholesaleComponent},
  {
    path: 'kind-manage', component: KindManageComponent, children: [
    {path: 'addKind', component: AddKindComponent},
    {path: 'upKind', component: AddKindComponent},
    {path: 'upKindImg', component: AddKindComponent}
  ]
  },
  {path: 'basic', component: BasicPropertiesComponent},
  {
    path: 'brands', component: BrandsComponent, children: [
    {path: 'addBrand', component: AddBrandComponent},
    {path: 'upBrand', component: AddBrandComponent},
    {path: 'upBrandImg', component: AddBrandComponent},
    {path: 'brandDetail', component: AddBrandComponent}
  ]
  }
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
    SkuGoodsComponent
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
