import {LayoutComponent} from '../layout/layout.component';
import {LoginComponent} from './pages/login/login.component';
import {PagesComponent} from './pages/pages/pages.component';
import {ButtonDemoComponent} from "./buttons/buttonDemo/button-demo.component";
// 设置路由指向
export const routes = [
  {
    path: 'main',
    component: LayoutComponent,
    children: [
      {path: '', redirectTo: '/main/home', pathMatch: 'full'},
      {path: 'home', loadChildren: './home/home.module#HomeModule'},
      {path: 'website', loadChildren: './website/website.module#WebsiteModule'},
      {path: 'operation', loadChildren: './operation/operation.module#OperationModule'},
      {path: 'goods', loadChildren: './goods/goods.module#GoodsModule'},
      {path: 'shops', loadChildren: './operationpage/operationpage.module#OperationpageModule'},
      {path: 'member', loadChildren: './member/member.module#MemberModule'},
      {path: 'sale', loadChildren: './echarts/echarts.module#EchartsModule'},
      {path: 'stat', loadChildren: './statistics/statistics.module#StatisticsModule'},
      {path: 'agent', loadChildren: './agent/agent.module#AgentModule'},
      {path: 'app', loadChildren: './msg/msg.module#MsgModule'},
      {path: 'edit-pw', loadChildren: './edit-pw/edit-pw.module#EditPwModule'},
      {path: 'text-editing', loadChildren: './text-editing/text-editing.module#TextEditingModule'},
      {path: 'orders', component: ButtonDemoComponent},
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
