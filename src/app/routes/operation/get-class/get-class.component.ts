import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {AjaxService} from "../../../core/services/ajax.service";
import {AppComponent} from "../../../app.component";
declare var $: any;

@Component({
  selector: 'app-get-class',
  templateUrl: './get-class.component.html',
  styleUrls: ['./get-class.component.scss']
})
export class GetClassComponent implements OnInit, OnChanges{

  @Input('articleClassId') articleClassId: string; //当前的文章类别的id

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
   * 1.根据类型显示不同的内容
   * 2.如果模板的编码存在，获取当前load的信息
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['articleClassId']) {
      console.log("█ id ►►►",  this.articleClassId);
      this.getCurArticleInfo()
    }

  }

  /**
   * 修改或者是审核的时候获取到当前的类别
   */
  getCurArticleInfo(){
    let url='/articleClass/loadArticleClassById';
    let data={id:this.articleClassId};
    this.ajax.get({
      url: url,
      data:data,
      async:false,
      success: (data) => {
        this.menuNameText=data.data.acName;
        this.selsectMenuCode=data.data.id;
        this.cityConfirm()
       console.log(data)
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    });
  }
d
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
    this.myData.emit(this.selsectMenuCode);//菜单点击的时候加发射当前的文章分类id
    this.menuLists=this.getselectMenu(menuCode);
  }

  /**
   * 获取菜单列表
   * @returns {any}
   */
  getselectMenu(menuCode?){
    let menuList;
    let getmenuCode=menuCode?menuCode:0;
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
    this.myData.emit(this.selsectMenuCode);
  }
}
