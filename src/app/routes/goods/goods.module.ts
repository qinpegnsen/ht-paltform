import {NgModule} from "@angular/core";
import {PublishComponent} from "./publish/publish.component";
import {ManageComponent} from "./manage/manage.component";
import {BrandsComponent} from "./brands/brands.component";
import {KindManageComponent} from "./kind/kind-manage/kind-manage.component";
import {PropertiesComponent} from "./kind/properties/properties.component";
import {RouterModule, Routes} from "@angular/router";
import {AddKindComponent} from "./kind/kind-manage/add-kind/add-kind.component";
import {SharedModule} from "../../shared/shared.module";
import { AddBrandComponent } from './brands/add-brand/add-brand.component';

// 父路由，用于页面嵌套显示
const routes: Routes = [
  {path: '', redirectTo: 'publish'},
  {path: 'publish', component: PublishComponent},
  {path: 'manage', component: ManageComponent},
  {path: 'kind',children: [
    {path: 'manage', component: KindManageComponent,children: [
      {path: 'addKind', component: AddKindComponent}
    ]},
    {path: 'properties', component: PropertiesComponent},
  ]},
  {path: 'brands', component: BrandsComponent,children: [
    {path: 'addBrand', component: AddBrandComponent}
  ]}
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PublishComponent,
    ManageComponent,
    BrandsComponent,
    KindManageComponent,
    PropertiesComponent,
    AddKindComponent,
    AddBrandComponent
  ]
})
export class GoodsModule {
}
