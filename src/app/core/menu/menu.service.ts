import { Injectable } from '@angular/core';
import {CookieService} from "angular2-cookie/core";
import {any} from "codelyzer/util/function";
import {isNullOrUndefined} from "util";
import {menu} from "../../routes/menu";

//后台菜单返回格式
interface menuVO{
  sysCode:string;
  menuCode:string;
  menuName:string;
  menuUrl:string;
  menuIcon?:string;
  preMenuCode?:string;
  subMenuList?:Array<any>;
  level?:number;
  ord?:number;
  remarks?:string;
  enable:string;
}

class MenuItem {
  text:string;  //菜单文字
  heading:boolean;  //
  link:string;     // internal route links
  elink:string;    // used only for external links
  target:string;   // anchor target="_blank|_self|_parent|_top|framename"
  icon:string;  //图标
  alert:string; //
  submenu:Array<any>;
}

@Injectable()
export class MenuService {

  constructor(private cookieService:CookieService) {
  }
  foreachPushMenu(items:Array<menuVO>) {
    let menuItems:Array<MenuItem> = [],menuItem:MenuItem;
    console.log("█ items ►►►",  items);
    items.forEach((item) => {
      menuItem = new MenuItem();
      //设置菜单显示名称
      menuItem.text = item.menuName;
      menuItem.link = item.menuUrl;
      //判断菜单是否有下级
      if (item.subMenuList.length > 0) {
        menuItem.alert = "▼";
        menuItem.submenu = this.foreachPushMenu(item.subMenuList);
      }
      else menuItem.link = item.menuUrl;
      //判断菜单图标是否为空
      if (!isNullOrUndefined(item.menuIcon)) menuItem.icon = item.menuIcon;

      menuItems.push(menuItem);
    });
    return menuItems;
  }
  /**
   * 设置权限菜单信息
   * @param items
   */
  addMenu(items:Array<menuVO>) {
    let menuItems:Array<MenuItem> = [],menuItem:MenuItem;
    menuItems = this.foreachPushMenu(items);
    let menuItemsString = JSON.stringify(menuItems);
    sessionStorage.setItem('userMenu', menuItemsString); //保存menu信息至cookie
  }

  /**
   * 获取权限菜单
   * @returns {Array<any>}
   */
  getMenu() {
    let menus = JSON.parse(sessionStorage.getItem("userMenu"));
    return menu; //cookie中取出
  }

  /**
   * 获取子菜单
   * @param menuText
   */
  getSubMenu(link){
    //这个link可能是一级菜单，二级菜单、三级菜单……，只需要取第一级路由即可（取到/main/**）
    let path = '/main/' + link.split('/')[2];
    console.log("█ path ►►►",  path);
    let subMenus = [];
    this.getMenu().forEach((menuItem) => {
      if (menuItem.link == path && !isNullOrUndefined(menuItem['submenu'])){
        subMenus = menuItem['submenu']
      }
    })
    return subMenus;
  }

}
