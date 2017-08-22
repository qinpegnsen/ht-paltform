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

  /**
   * 设置权限菜单信息
   * @param items
   */
  addMenu(items:Array<menuVO>) {
    items.forEach((item) => {

    });
  }

  /**
   * 获取权限菜单
   * @returns {Array<any>}
   */
  getMenu() {
    return menu; //cookie中取出
  }

  /**
   * 获取子菜单
   * @param menuText
   */
  getSubMenu(link){
    //这个link可能是一级菜单，二级菜单、三级菜单……，只需要取第一级路由即可
    let path = '/' + link.split('/')[1];
    let subMenus = [];
    menu.forEach((menuItem) => {
      if (menuItem.link == path && !isNullOrUndefined(menuItem['submenu'])){
        subMenus = menuItem['submenu']
      }
    })
    return subMenus;
  }

}
