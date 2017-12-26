import {Injectable} from "@angular/core";
import {CanActivate, NavigationStart, Router} from "@angular/router";
import {isNullOrUndefined} from "util";
const swal = require('sweetalert');

@Injectable()
export class RouterGuardService implements CanActivate {

  private urlHome: string = "/main/home";//路由不匹配时重定向
  private menus;//有权限的路由组合
  public path;//当前路由

  constructor(private router: Router) {
    this.menus = this.getAllRouterLink();//取到所有菜单的link；

    //监听路由，该事件一旦执行(除非刷新)停不下来呀，所以可以用来着接着监听后面的子路由是否有权限
    //该事件需写在构造器里，因为写在别的地方，该服务被调用几次，他就会重复执行几次，越来越多
    this.router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe((event) => {
        this.path = event['url'];
        if (this.path.indexOf(this.urlHome) < 0 && this.path.indexOf('pages') < 0 && !isNullOrUndefined(this.menus)) {
          // 当路由为home时，不拦截,当menus为空时不拦截（当退出登录时，清空了所有cookie，但是路由监听还在执行，由此取到Menu为undefined）
          let hasPermission: boolean = RouterGuardService.isPermission(this.menus, this.path);
          if (!hasPermission) this.router.navigate([this.urlHome]), swal('您的权限不足','','warning');
        }
      });
  }

  canActivate() {
    let rulHref = window.location.href, host = window.location.host;
    //如果有刷新页面，router监听一般获取到undefined，通过JQuery获取全路径之后截取到path，防止刷新后重定向到home
    if (isNullOrUndefined(this.path)) this.path = rulHref.substring(rulHref.indexOf(host)).substring(host.length);
    if (this.path.indexOf(this.urlHome) < 0 && this.path.indexOf('pages') < 0 && !isNullOrUndefined(this.menus)) {//当路由为home时，不拦截
      let hasPermission: boolean = RouterGuardService.isPermission(this.menus, this.path);
      if (!hasPermission) this.router.navigate([this.urlHome]);
    }
    return true;
  }

  /**
   * 取到所有菜单的link，组成新的数组
   * @returns {Array}
   */
  private getAllRouterLink() {
    let allMenus = JSON.parse(localStorage.getItem('userMenu'));
    let menuUrls = [];
    allMenus.forEach((menu) => {
      if (menu.submenu) {
        menu.submenu.forEach((submenu) => {
          menuUrls.push(submenu.link)
        })
      } else {
        menuUrls.push(menu.link);
      }
    });
    return menuUrls;
  }

  /**
   * 权限匹配，当前路由与权限菜单中路由匹配（相等或包含当前路由）则有权限
   * @param paths
   * @param path
   * @returns {boolean}
   */
  private static isPermission(paths, path) {
    for (let i = 0; i < paths.length; i++) {
      if (paths[i].indexOf(path) == 0) return true;
    }
    return false;
  }

}
