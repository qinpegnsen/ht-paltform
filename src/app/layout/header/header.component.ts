import {Component, OnInit, ViewChild} from '@angular/core';
const screenfull = require('screenfull');
const browser = require('jquery.browser');
declare var $: any;
import {UserblockService} from '../sidebar/userblock/userblock.service';
import {SettingsService} from '../../core/settings/settings.service';
import {MenuService} from '../../core/menu/menu.service';
import {Router} from "@angular/router";
import {AjaxService} from '../../core/services/ajax.service';
import {CookieService} from "angular2-cookie/core";
import {LayoutComponent} from "../layout.component";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  navCollapsed = true;
  menuItems = [];
  isNavSearchVisible: boolean;
  @ViewChild('fsbutton') fsbutton;

  constructor(public menu: MenuService, public userblockService: UserblockService, public settings: SettingsService,
              private ajax: AjaxService, private router: Router,private cookieService:CookieService,private layout:LayoutComponent) {
    // 只显示指定的
    let allMenus = [];
    if(typeof menu.getMenu() !== 'undefined') allMenus = menu.getMenu();
    this.menuItems = this.getSubmenuFirstLink(allMenus);// 获取子菜单的第一个的链接作为一级菜单的链接，可使一级菜单切换时页面默认为子菜单的第一项
  }

  ngOnInit() {
    this.isNavSearchVisible = false;
    if (browser.msie) { // 不支持ie
      this.fsbutton.nativeElement.style.display = 'none';
    }
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
   * 为子菜单赋值
   */
  getSubmenus(text){
    let menus = this.menu.getSubMenu(text);
    this.layout.submenus(menus)
  }

  /**
   *  获取子菜单的第一个的链接作为一级菜单的链接，可使一级菜单切换时页面默认为子菜单的第一项
   * @param allMenus
   * @returns {any}
   */
  private getSubmenuFirstLink(allMenus){
    allMenus.forEach((menu) => {
      if(!isNullOrUndefined(menu['submenu'])){
        menu['link'] = menu['submenu'][0].link;
      }
    })
    return allMenus;
  }
}
