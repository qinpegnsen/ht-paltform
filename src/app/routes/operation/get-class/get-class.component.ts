import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {AjaxService} from "../../../core/services/ajax.service";
declare var $: any;

@Component({
  selector: 'app-get-class',
  templateUrl: './get-class.component.html',
  styleUrls: ['./get-class.component.scss']
})
export class GetClassComponent implements OnInit {
  /**
   * 输入属性sysCode  用来查询当前系统下面的素所有菜单
   */

  private show: boolean = false;//选择菜单得的下弹框默认是隐藏的，只有在聚焦的时候才会出现

  public menuLists:string;//用来存储当前系统下面的所有的菜单

  public menuNameText:string=''//用来存储输入框里面的东西

  public selsectMenuCode:string=''//用来存储输入框里面的东西

  /**
   * 把当前的选择的菜单编码发射出去
   * @type {EventEmitter}
   */
  @Output()
  myData = new EventEmitter();

  constructor(private ajax:AjaxService) { }

  ngOnInit() {
    /**
     * 点击区域选框外页面时，关闭选框
     * @type {SelectAreaComponent}
     * @private
     */
    let _this = this;
    $('body').click(function (e) {
      let event = e.target.attributes['class'];
      if (isNullOrUndefined(event) || isNullOrUndefined(event.nodeValue) || event.nodeValue.indexOf("rzh-sel-city") <= 0) _this.show = false; //关闭选框
    });
  }
  /**
   * 前台页面的聚焦事件，当聚焦的时候就会执行这个方法，然后调用下面获取菜单列表getselectMenu的方法
   */
  showSelectMenu(){
    this.show=true;
    this.menuNameText='';
    this.menuLists=this.getselectMenu();
  }

  /**
   * 菜单点击的时候执行的方法
   */
  getMenuName(menuCode,menuName){
    if(this.menuNameText==''){
      this.menuNameText+='';
      this.menuNameText+=menuName;
    }else{
      this.menuNameText+='>';
      this.menuNameText+=menuName;
    }
    this.selsectMenuCode=menuCode;

    this.menuLists=this.getselectMenu(menuCode);

  }

  /**
   * 获取菜单列表
   * @returns {any}
   */
  getselectMenu(menuCode?){
    let menuList;
    let getmenuCode=menuCode?menuCode:null;
    this.ajax.get({
      url: '/articleClass/queryArticleClassByAcParentId',
      async:false,
      data: {
        'acParentId':getmenuCode
      },
      success: (data) => {
        menuList = data.data;
        if(data.totalRow==0){
          this.show=false;
        }
      },
      error: (data) => {
        console.log("error");
      }
    });
    return menuList;
  }

  /**
   * 点击刷新的时候清空文本区域，下拉的选项重新回到上一级
   */
  freshCitys(){
    this.menuNameText=''
    this.menuLists =this.getselectMenu();
  }

  /**
   * 点击确定的时候执行的方法
   */
  cityConfirm(){
    this.show=false;
    if (this.menuNameText == '') {
      this.selsectMenuCode = ''
    }
    this.myData.emit(this.selsectMenuCode)
  }
}
