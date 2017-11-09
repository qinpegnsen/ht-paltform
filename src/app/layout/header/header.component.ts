import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from "@angular/core";
import {UserblockService} from "../sidebar/userblock/userblock.service";
import {SettingsService} from "../../core/settings/settings.service";
import {MenuService} from "../../core/menu/menu.service";
import {Router} from "@angular/router";
import {AjaxService} from "../../core/services/ajax.service";
import {CookieService} from "angular2-cookie/core";
import {LayoutComponent} from "../layout.component";
import {isNullOrUndefined} from "util";
import {Page} from "../../core/page/page";
import {SubmitService} from "../../core/forms/submit.service";
const screenfull = require('screenfull');
const browser = require('jquery.browser');
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {

  private platformInfoData: any;                           //代理商系统消息的数据
  @Input() private curPath;

  ngOnChanges(changes: SimpleChanges): void {
    let me = this;
    if (changes['curPath'] && !isNullOrUndefined(me.curPath)) {
      // 每次路由变化时检测其与一级导航路由是否匹配，匹配则为一级导航添加激活状态
      me.getSubmenus(me.curPath);
    }
  }


  navCollapsed = true;
  menuItems = [];

  isNavSearchVisible: boolean;
  @ViewChild('fsbutton') fsbutton;

  constructor(public menu: MenuService, public userblockService: UserblockService, public settings: SettingsService,
              private ajax: AjaxService, private router: Router, private cookieService: CookieService, private layout: LayoutComponent, private submitService: SubmitService) {
    // 只显示指定的
    if (typeof menu.getMenu() !== 'undefined') this.menuItems = menu.getMenu();
  }

  ngOnInit() {
    this.isNavSearchVisible = false;
    if (browser.msie) { // 不支持ie
      this.fsbutton.nativeElement.style.display = 'none';
    }
    let me = this;
    // 初始化时检测当前路由与一级导航路由是否匹配，匹配则为一级导航添加激活状态
    $(function () {
      let rulHref = window.location.href;
      let path = rulHref.substring(rulHref.indexOf('/main'), rulHref.length);
      me.getSubmenus(path);
    })
    this.queryAdminNotify();
    setInterval(() => {//每5秒钟请求一次，如果用docheck钩子的话，文章关联商品的时候卡顿
      this.queryAdminNotify();
    }, 5000);

  }

  /**
   * 获取通知的消息列表，默认只展示第一页的内容
   */
  queryAdminNotify() {
    let url = '/notifyAdmin/pageQuery';
    let data = {
      curPage: 1,
      pageSize: 3,
      sortColumns: ''
    };
    this.platformInfoData = new Page(this.submitService.getData(url, data));
  }

  /**
   * 消息弹框点击直接跳转到传过来的url页面
   */
  linkDetail(detailUrl){
    let url=$.trim(detailUrl);
    this.router.navigateByUrl(url);
  }

  //显示、隐藏当前登录的用户信息
  toggleUserBlock(event) {
    event.preventDefault();
    this.userblockService.toggleVisibility();
  }

  //开启全局搜索
  openNavSearch(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setNavSearchVisible(true);
  }

  setNavSearchVisible(stat: boolean) {
    // console.log(stat);
    this.isNavSearchVisible = stat;
  }

  getNavSearchVisible() {
    return this.isNavSearchVisible;
  }

  toggleOffsidebar() {
    this.settings.layout.offsidebarOpen = !this.settings.layout.offsidebarOpen;
  }

  //显示隐藏侧边栏
  toggleCollapsedSideabar() {
    this.settings.layout.isCollapsed = !this.settings.layout.isCollapsed;
  }

  isCollapsedText() {
    return this.settings.layout.isCollapsedText;
  }

  //全屏
  toggleFullScreen(event) {
    if (screenfull.enabled) screenfull.toggle();
    let el = $(this.fsbutton.nativeElement);
    if (screenfull.isFullscreen) {
      el.children('em').removeClass('fa-expand').addClass('fa-compress');
    }
    else {
      el.children('em').removeClass('fa-compress').addClass('fa-expand');
    }
  }

  /**
   * 退出登录
   */
  logout() {
    localStorage.clear(); //清空所有storage
    this.cookieService.removeAll(); //清空所有cookie
    this.ajax.get({
      url: "/login/logout",
      success: (result) => {
        if (result.success) {
          this.router.navigate(['/pages/login'], {replaceUrl: true});
        }
      }
    });
  }

  /**
   * 为子菜单赋值，通过父组件（layout）的方法来给同级的组件（sidebar）传值，所以这里把子菜单传给了父组件（layout）的方法
   *
   * @param text
   */
  getSubmenus(link) {
    let menus = this.menu.getSubMenu(link);
    this.layout.submenus(menus)
  }

}
