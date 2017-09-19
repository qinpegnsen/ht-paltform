import {Component, HostBinding, OnInit, ViewChild, ViewContainerRef} from "@angular/core";
import {Location} from "@angular/common";
import {SettingsService} from "./core/settings/settings.service";

import {Router} from "@angular/router";
import {ToasterConfig, ToasterService} from "angular2-toaster";
import {isNullOrUndefined} from "util";
import {CookieService} from "angular2-cookie/core";

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public toaster: ToasterConfig = new ToasterConfig({
    showCloseButton: true,
    tapToDismiss: false,
    timeout: {'success': 3000, 'warning': 3000, 'error': 5000},
    positionClass: 'toast-top-center',
    animationClass: 'slide-from-top'
  });
  static toasterConfig:ToasterConfig; //消息提示配置
  static toasterService:ToasterService; //消息提示服务
  //动态样式
  @HostBinding('class.layout-fixed') get isFixed() {
    return this.settings.layout.isFixed;
  };

  @HostBinding('class.aside-collapsed') get isCollapsed() {
    return this.settings.layout.isCollapsed;
  };

  @HostBinding('class.layout-boxed') get isBoxed() {
    return this.settings.layout.isBoxed;
  };

  @HostBinding('class.layout-fs') get useFullLayout() {
    return this.settings.layout.useFullLayout;
  };

  @HostBinding('class.hidden-footer') get hiddenFooter() {
    return this.settings.layout.hiddenFooter;
  };

  @HostBinding('class.layout-h') get horizontal() {
    return this.settings.layout.horizontal;
  };

  @HostBinding('class.aside-float') get isFloat() {
    return this.settings.layout.isFloat;
  };

  @HostBinding('class.offsidebar-open') get offsidebarOpen() {
    return this.settings.layout.offsidebarOpen;
  };

  @HostBinding('class.operationpage-open') get operationpageOpen() {
    return this.settings.layout.operationpageOpen;
  }; // 是否显示右侧操作页面 by 立坤
  @HostBinding('class.aside-toggled') get asideToggled() {
    return this.settings.layout.asideToggled;
  };

  @HostBinding('class.aside-collapsed-text') get isCollapsedText() {
    return this.settings.layout.isCollapsedText;
  };

  @ViewChild("altComponent", {read: ViewContainerRef}) container: ViewContainerRef;


  constructor(public settings: SettingsService, private cookieService: CookieService, private location: Location, private router: Router,private toasterService:ToasterService) {
    AppComponent.toasterService = toasterService;
  }

  ngOnInit() {
    $(document).on('click', '[href="#"]', e => e.preventDefault());
    //登录状态检测
    this.checkLogin();
  }

  /**
   * 消息提醒弹框
   * @param type 类型：error、success、info...
   * @param title 提示头信息
   * @param info 内容信息
   * @param operation 参数信息
   */
  static rzhAlt (type: string, title: string, info?: string, operation?: any,appcom?:AppComponent) {
    if (!isNullOrUndefined(operation)) appcom.toaster = new ToasterConfig(operation);
    AppComponent.toasterService.pop(type, title, info);
  }

  // 检测登录状态并引流
  private checkLogin() {

    let url = this.location.path();
    console.log(url)
    console.log(this)
    let loginCookie = this.cookieService.get("SZH_LINFO");
    if (url !== "/pages/login") {
      if (!loginCookie) this.router.navigate(['/pages/login'], {replaceUrl: true}); //路由跳转
    } else {
      if (loginCookie) this.router.navigate(['/home'], {replaceUrl: true}); //路由跳转
    }
  }
}
