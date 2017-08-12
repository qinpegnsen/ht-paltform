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
      {path: 'datatables', loadChildren: './datatables/datatables.module#DatatablesModule'},
      {path: 'msg', loadChildren: './msg/msg.module#MsgModule'},
      {path: 'echarts', loadChildren: './echarts/echarts.module#EchartsModule'},
      {path: 'operationpage', loadChildren: './operationpage/operationpage.module#OperationpageModule'},
      {path: 'navtree', loadChildren: './navtree/navtree.module#NavtreeModule'},
      {path: 'buttons', component: ButtonDemoComponent}
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
