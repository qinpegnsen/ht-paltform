import {LayoutComponent} from '../layout/layout.component';
import {LoginComponent} from './pages/login/login.component';
import {PagesComponent} from './pages/pages/pages.component';
import {ButtonDemoComponent} from "./buttons/buttonDemo/button-demo.component";
// 设置路由指向
export const routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', redirectTo: '/home', pathMatch: 'full'},
      {path: 'home', loadChildren: './home/home.module#HomeModule'},
      {path: 'website', component: ButtonDemoComponent},
      {path: 'DBO', loadChildren: './msg/msg.module#MsgModule'},
      {path: 'goods', loadChildren: './echarts/echarts.module#EchartsModule'},
      {path: 'shops', loadChildren: './operationpage/operationpage.module#OperationpageModule'},
      {path: 'member', loadChildren: './navtree/navtree.module#NavtreeModule'},
      {path: 'sale', loadChildren: './echarts/echarts.module#EchartsModule'},
      {path: 'stat', loadChildren: './operationpage/operationpage.module#OperationpageModule'},
      {path: 'agent', loadChildren: './navtree/navtree.module#NavtreeModule'},
      {path: 'app', loadChildren: './msg/msg.module#MsgModule'},
      {path: 'orders', component: ButtonDemoComponent},
    ]
  },
  {
    path: 'pages',
    component: PagesComponent,
    children: [
      {path: '', redirectTo: '/home', pathMatch: 'full'},
      {path: 'login', component: LoginComponent}
    ]
  },
  // 路由指向找不到时，指向这里
  {path: '**', redirectTo: '/home'}
];
