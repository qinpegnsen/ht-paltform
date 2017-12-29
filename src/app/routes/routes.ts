import {LayoutComponent} from "../layout/layout.component";
import {LoginComponent} from "./pages/login/login.component";
import {PagesComponent} from "./pages/pages/pages.component";
import {RouterGuardService} from "../core/routerGuard/router-guard.service";
// 设置路由指向
export const routes = [
  {
    path: 'main',
    component: LayoutComponent,
    canActivate: [RouterGuardService], //路由守卫：只有有权限时，才能访问
    children: [
      {path: '', redirectTo: '/main/home', pathMatch: 'full'},
      {path: 'home', loadChildren: './home/home.module#HomeModule'},
      {path: 'website', loadChildren: './website/website.module#WebsiteModule'},
      {path: 'operation', loadChildren: './operation/operation.module#OperationModule'},
      {path: 'goods', loadChildren: './goods/goods.module#GoodsModule'},
      {path: 'shops', loadChildren: './operationpage/operationpage.module#OperationpageModule'},
      {path: 'member', loadChildren: './member/member.module#MemberModule'},
      {path: 'sale', loadChildren: './sale/sale.module#SaleModule'},
      {path: 'stat', loadChildren: './statistics/statistics.module#StatisticsModule'},
      {path: 'agent', loadChildren: './agent/agent.module#AgentModule'},
      {path: 'app', loadChildren: './app/app.module#AppModule'},
      {path: 'store', loadChildren: './store/store.module#StoreModule'},
      {path: 'activities', loadChildren: './activities/activities.module#ActivitiesModule'},
      {path: 'edit-pw', loadChildren: './edit-pw/edit-pw.module#EditPwModule'},
      {path: 'orders', loadChildren: './platform-order/platform-order.module#PlatformOrderModule'},
      {path: 'WO', loadChildren: './work-orders/work-orders.module#WorkOrdersModule'},
      {path: 'store-order', loadChildren: './store-order/store-order.module#StoreOrderModule'},
      {path: 'platform-order', loadChildren: './platform-order/platform-order.module#PlatformOrderModule'},
    ]
  },
  {
    path: 'pages',
    component: PagesComponent,
    children: [
      {path: '', redirectTo: '/main/home', pathMatch: 'full'},
      {path: 'login', component: LoginComponent}
    ]
  },
  // 路由指向找不到时，指向这里
  {path: '**', redirectTo: '/main/home'}
];
