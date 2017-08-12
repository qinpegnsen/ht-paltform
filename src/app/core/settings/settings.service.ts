import {Injectable} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {CookieService} from 'angular2-cookie/core';
import { Location }from '@angular/common';
declare var $: any;

@Injectable()
export class SettingsService {

  public user: any;
  public app: any;
  public layout: any;

  constructor(private _cookieService: CookieService, private location: Location) {

    /**
     * 用户信息（当前登录用户）
     * 获取用户cookie信息并展示
     */
    let loginInfo: any = this._cookieService.getObject('loginInfo'), name = '游客', job = '无';
    if (!isNullOrUndefined(loginInfo)) name = loginInfo.name, job = loginInfo.department;
    this.user = {
      name: name,
      job: job,
      picture: 'assets/img/user/user.png'
    };

    // App Settings
    // -----------------------------------
    this.app = {
      name: '爱馨信息科技-系统权限管理平台',
      description: '系统权限管理平台',
      year: ((new Date()).getFullYear())
    };

    // Layout Settings
    // -----------------------------------
    this.layout = {
      isFixed: true,
      isCollapsed: false,
      isBoxed: false,
      isRTL: false,
      horizontal: false,
      isFloat: false,
      asideHover: false,
      theme: null,
      asideScrollbar: false,
      isCollapsedText: false,
      useFullLayout: false,
      hiddenFooter: false,
      offsidebarOpen: false,
      operationpageOpen: false,  //是否显示右侧操作页面  by 立坤
      asideToggled: false,
      viewAnimation: 'ng-fadeInUp'
    };

  }

  getAppSetting(name) {
    return name ? this.app[name] : this.app;
  }

  getUserSetting(name) {
    return name ? this.user[name] : this.user;
  }

  getLayoutSetting(name) {
    return name ? this.layout[name] : this.layout;
  }

  setAppSetting(name, value) {
    if (typeof this.app[name] !== 'undefined') {
      this.app[name] = value;
    }
  }

  setUserSetting(name, value) {
    if (typeof this.user[name] !== 'undefined') {
      this.user[name] = value;
    }
  }

  setLayoutSetting(name, value) {
    if (typeof this.layout[name] !== 'undefined') {
      return this.layout[name] = value;
    }
  }

  toggleLayoutSetting(name) {
    return this.setLayoutSetting(name, !this.getLayoutSetting(name));
  }


  /**
   * 显示右侧页面 by 立坤
   * width是定义pc端下宽度，不传默认宽度是50%，可以传“30%”表示百分比宽度，可以传“500px”表示固定宽度
   * @param width
   */
  showRightPage(width?) {
    let me = this;
    setTimeout(() => {
      if ($(window).width() > 768 && !isNullOrUndefined(width)) $('.rightpage').css('width', width); //pc模式下,可以自定义宽度
      me.layout.operationpageOpen = true;  //开启右侧页面
      $('html').removeClass('csstransforms3d'); //剔除动画效果，此效果和浮动冲突
      $('app-offsidebar').hide();
    }, 10);
  }

  /**
   * 关闭右侧页面 by 立坤
   * @param
   */
  closeRightPage() {
    this.layout.operationpageOpen = false; //关闭右侧滑动页面
    $('html').addClass('csstransforms3d'); //加入样式，动态滑动效果
    $('app-offsidebar').show();
  }

  /**
   * 关闭右侧页面并返回上级路由
   * 针对路由跳转的右弹窗
   * by 高洁
   */
  closeRightPageAndRouteBack(){
    this.closeRightPage();//关闭右侧滑动页面
    let that = this;
    setTimeout(function(){
      that.location.back();//返回上级路由
    },100)
  }
}
